// import React, { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom'
// import baseUrl from '../baseUrl'

// function InitialPage({ setUserData }) {
//   const [loggedIn, setLoggedIn] = useState('pending')

//   useEffect(() => {
//     const authUser = async () => {
//       const username = localStorage.getItem('username')
//       const password = localStorage.getItem('password')
//       const role = localStorage.getItem('role')
//       if(username && password) {
//         try {
//           const res = await fetch(baseUrl + '/login', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//               username,
//               password,
//               role
//             }),
//             credentials:'include',
//           })
//           console.log(res)
//           if(res.ok) {
//             const jsonRes = await res.json()
//             setUserData(jsonRes)
//             setLoggedIn(true)
//           }
//         } catch (error) {
//           setLoggedIn(false)
//         }
//       }
//       setLoggedIn(false)
//     }
//     authUser()
//   }, [setUserData])

//   if(loggedIn === 'rejected')
//     return <Navigate to='/login' />
// 	if (loggedIn === 'pending')
// 		return <h2>PENDING</h2>
// 	return <Navigate to='/dashboard' />
// }

// export default InitialPage
