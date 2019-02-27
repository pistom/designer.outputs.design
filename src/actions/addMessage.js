export default function addMessage(dateTime, message) {
  return {
    type: 'ADD_MESSAGE',
    message,
    date: dateTime.date,
    time: dateTime.time
  }
}
