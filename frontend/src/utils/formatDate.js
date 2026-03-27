export const formatDate = (isdate) => {
    const date = new Date(isdate)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',

    })
}