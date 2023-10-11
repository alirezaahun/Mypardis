export default {
  data: ({ $__ }) => {
    return {
      headerMenuItems: [
        {
          title: $__('categories'),
          to: '/categories'
        },
        {
          title: $__('customerClub'),
          to: 'customer-club/cash-prize'
        }
      ]
    }
  }
}
