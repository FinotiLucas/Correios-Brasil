const fetch = require("node-fetch");

module.exports = {
  request(url, options) {
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        if (
          res.headers.get("content-type") !== "application/json; charset=utf-8"
        )
          return res.arrayBuffer();
        else return res.json();
      })
      .catch((err) => new Error(`${url} gerou um erro ${err}`));
  },
};
