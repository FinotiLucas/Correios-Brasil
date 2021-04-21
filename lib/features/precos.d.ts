import { PrecoPrazoRequest, PrecoPrazoResponse } from '../interfaces';
/**
 *
 * @param {PrecoPrazoRequest} precoPrazo
 */
declare function calcularPrecoPrazo(
  precoPrazo: PrecoPrazoRequest,
): Promise<void | PrecoPrazoResponse>;
export default calcularPrecoPrazo;
