export function formatStatus(str: string): string {
  /**
   * @param {string} str
   * Função responsável formatar o Local de entrega de uma encomenda
   */
  const res = str
    .replace('Status', '')
    .replace(/\s\s+/g, ' ')
    .replace(':', '')
    .trim();
  return res;
}

export function formatDateTime(str: string): string[] {
  /**
   * @param {string} str
   * Função responsável por a formatação da data e hora de entrega de uma encomenda
   */
  const res = str
    .split(' ')
    .join('')
    .replace(/\s\s+/g, ' ')
    .replace('Data:', '')
    .replace('Hora:', '')
    .split('|');

  return res;
}

export function formatLocal(str: string): string {
  /**
   * @param {string} str
   * Função responsável formatar o Local de entrega de uma encomenda
   */
  const res = str
    .replace('Local', '')
    .replace(/\s\s+/g, ' ')
    .replace(':', '')
    .trim();
  return res;
}

export function formatOrigin(str: string): string {
  /**
   * @param {string} str
   * Função responsável formatar o Origem do trajeto de entrega de uma encomenda
   */
  const res = str
    .replace('Origem', '')
    .replace(/\s\s+/g, ' ')
    .replace(':', '')
    .trim();
  return res;
}

export function formatDestiny(str: string): string {
  /**
   * @param {string} str
   * Função responsável formatar o Destino do trajeto de entrega de uma encomenda
   */
  const res = str
    .replace('Destino', '')
    .replace(/\s\s+/g, ' ')
    .replace(':', '')
    .trim();
  return res;
}
