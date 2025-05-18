export const DEFAULT_MAX_POST_BYTES = 200

export function getConfig(env?: Partial<CloudflareBindings>) {
  let maxPostBytes = DEFAULT_MAX_POST_BYTES

  if (env?.MAX_POST_BYTES) {
    const parsed = parseInt(env.MAX_POST_BYTES.toString(), 10)
    if (!isNaN(parsed)) {
      maxPostBytes = parsed
    }
  }

  return {
    maxPostBytes
  }
}