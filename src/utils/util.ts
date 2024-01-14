export const flatFunc = (arr) => {
  return arr.reduce((pre, cur) => {
    if (cur.children) {
      const curArr = JSON.parse(JSON.stringify(cur.children))
      delete cur.children
      pre.push(cur)
      pre.push(...flatFunc(curArr))
    }
    if (cur.checkItems) {
      const curArr = JSON.parse(JSON.stringify(cur.checkItems))
      delete cur.checkItems
      pre.push(cur)
      pre.push(...flatFunc(curArr))
    } else {
      pre.push(cur)
    }
    return pre
  }, [])
}