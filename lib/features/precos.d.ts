import { PrecoPrazoRequest, PrecoPrazoResponse } from '../Interfaces';
/**
 *
 * @param {PrecoPrazoRequest} precoPrazo
 */
declare function calcularPrecoPrazo(
  precoPrazo: PrecoPrazoRequest,
): Promise<void | PrecoPrazoResponse>;
export default calcularPrecoPrazo;
