export const TYPE_VERIFY = {
  SMS: 'SMS',
  EMAIL: 'EMAIL',
}

export const FIELD_RULE = {
  EMAIL: [
    {
      required: true,
      message: 'Email là bắt buộc',
    },
    {
      type: 'email',
      message: 'Định dạng email không đúng',
    },
  ],
  PHONE: [
    {
      required: true,
      message: 'Số điện thoại là bắt buộc',
      type: 'string',
    },
    {
      type: 'string',
      min: 9,
      max: 11,
      message: 'Số điện thoại cần > 9 số và < 11 số',
    },
    {
      validator: (_, value) => {
        if (value && value.match(/([^0-9])/)) {
          return Promise.reject(new Error('Số điện thoại định dạng không đúng'))
        } else {
          return Promise.resolve()
        }
      },
    },
  ],
}
