module.exports = {

  formatStatus(str) {
    /**
     * @param {string} str
     * Função responsável formatar o Local de entrega de uma encomenda
     */
    const res = str.replace("Status", "").replace(":", "").trim();
    return res;
  },

  formatDateTime(str) {
    /**
     * @param {string} str
     * Função responsável por a formatação da data e hora de entrega de uma encomenda
     */
    const res = str
      .split(" ")
      .join("")
      .replace("Data:", "")
      .replace("Hora:", "")
      .split("|");

    return res;
  },

  formatLocal(str) {
    /**
     * @param {string} str
     * Função responsável formatar o Local de entrega de uma encomenda
     */
    const res = str.replace("Local", "").replace(":", "").trim();
    return res;
  },
};
