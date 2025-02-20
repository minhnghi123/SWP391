 import React from 'react';
import ProfileUser from './profileUser';
 const  HeaderLeftSide = ({account,user}) => {
    return (
        <>
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">
                            Welcome Back, {account?.name}!
                        </h1>
                        <p className="text-teal-100">
                            Complete your payment information below
                        </p>
                    </div>
                </div>
            </div>

            {/* Patient Profile */}
            <ProfileUser
                id={account?.id || ''}
                name={account?.name || ''}
                email={account?.email || ''}
                status={user?.status ? 'Active' : 'No Active'}
                img={account?.picture || Avatar}
            />
        </>


    )
}

export default HeaderLeftSide;