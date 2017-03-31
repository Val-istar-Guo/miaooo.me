export default function (strategies) {
  if (strategies.default) throw new Error('detectEnv expect deault strategy');
  return strategies[process.env.NODE_ENV] || strategies.default;
}
