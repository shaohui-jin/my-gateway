// import '@/utils/prototype/array';
export function globalPrototypes() {
  const apiContext = require.context('../prototype/', true, /\.ts/);
  apiContext.keys().forEach((modulePath: string) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    import(`../prototype/${moduleName}.ts`);
  });
}