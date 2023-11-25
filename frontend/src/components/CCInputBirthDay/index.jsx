import CCInput from '@/components/CCInput'
import dayjs from 'dayjs'

// Fixed 20/08/2023
// Age: 18 or higher

const CCInputBirthDay = ({ name, ...props }) => {
  const disabledDate = (current) => {
    return dayjs().endOf('day').year() - current.year() < 18
  }
  const currentDate = `01/01/${dayjs().endOf('day').year() - 18}`
  return (
    <CCInput
      defaultPickerValue={dayjs(currentDate)}
      type="date"
      name={name}
      label="Ngày sinh"
      placeholder="15/01/1966 - ENTER"
      disabledDate={disabledDate}
      {...props}
    />
  )
}

export default CCInputBirthDay
