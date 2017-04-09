module.exports.snapshot = function* snapshot (compiler, next) {
  const snapshotFile = compiler.options.snapshot

  if (!snapshotFile) {
    return next()
  }

  const file = yield compiler.readFileAsync('configure')
  file.contents = file.contents
    .replace(
      'def configure_v8(o):',
      `def configure_v8(o):\n  o['variables']['embed_script'] = '${snapshotFile}'\n  o['variables']['warmup_script'] = '${snapshotFile}'`
    )
  return next()
}
