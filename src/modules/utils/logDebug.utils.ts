const getSymbolByType = (type: 'INFO' | 'ERROR' | 'WARNING') => {
  if (type === 'ERROR') return '❌❌❌';
  return '🔔🔔🔔';
}

export const logDebug = (
  type: 'INFO' | 'ERROR' | 'WARNING',
  service: 'TRON',
  error: any
) => console.log(`${getSymbolByType(type)} [${new Date().toLocaleString()}] [${type}] [${service}] => ${error}`);

export const logTestInfo = (
  type: 'AUTH' | 'INTERNAL' | 'PUBLIC' | 'MIDDLEWARE',
  log: any,
) => `💊 [${type}] ${log}`