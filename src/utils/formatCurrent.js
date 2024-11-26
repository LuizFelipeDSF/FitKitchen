export function formatCurrencyBRL(value) {
  if (typeof value !== 'number') {
    console.warn(`Valor inválido para formatCurrencyBRL: ${value}`);
    return 'R$ 0,00';
  }
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
