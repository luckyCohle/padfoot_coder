import React from 'react'
import { ClipLoader } from 'react-spinners'

function Spinner() {
  return (
         <ClipLoader
        color={"#ffffff"}
        loading={true}
        size={18}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default Spinner