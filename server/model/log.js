const hours = 3600

const day = 24 * hours

const month = 30 * day

module.exports = {
  ip: {
    type: String,
  },
  data: {
    type: Object,
  },
  time: { type: Date, default: Date.now(), index: { expires: month * 2 } },
}
