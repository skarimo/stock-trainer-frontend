export default class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  postRequest(URL, loginObj) {
    return fetch((this.baseURL + URL), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginObj),
    }).then(res => res.json())
  }

  postRequestAfterToken(URL, token, data) {
    return fetch((this.baseURL + URL), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
        },
        body: JSON.stringify(data),
    }).then((result) => {
      return result.json()
    })
  }

  getRequest(URL, token) {
    return fetch((this.baseURL + URL), {
      headers: {
          "Authorization": `${token}`
      },
    }).then(res => res.json())
  }

  login(loginObj) {
    return this.postRequest('/auth/login', loginObj)
  }

  register(newUserInfo) {
    return this.postRequest('/auth/register', newUserInfo)
  }

  existingTokenCheck(token) {
    return this.getRequest('/authorize_token', token)
  }

  getUserData(token, userId) {
    return this.getRequest(`/users/${userId}`, token)
  }

}
