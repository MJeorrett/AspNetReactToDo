export type BookingStatus = 'Enquiry'|'Awaiting Response'|'Response Received'|'Not Responding'|'Urgent Action Required'|'Cancelled'|'Confirmed';
export const BookingStatuses = ['Enquiry', 'Awaiting Response', 'Response Received', 'Not Responding', 'Urgent Action Required', 'Cancelled', 'Confirmed'];


const statusColour = (status : BookingStatus) => {
    switch(status){
        case 'Enquiry':
            return '#ff9966';
        case 'Awaiting Response':
            return '#ff9966';
        case 'Response Received':
            return '#ff9966';
        case 'Not Responding':
            return 'tomato'
        case 'Urgent Action Required':
            return 'tomato'
        case 'Confirmed':
            return '#3c99a0'
        case 'Cancelled':
            return '#3c99a0'
        default:
            return 'lightGrey';
    }
}

export default statusColour;
