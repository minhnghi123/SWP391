import React, { memo, useMemo } from 'react';
import ProfileUser from './profileUser';
import ToUperCaseFirstLetter from '../../../../utils/upperCaseFirstLetter'
const HeaderLeftSide = ({ user }) => {
    return (
        <>
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#00a0aa] to-[#3AC5C9] rounded-3xl p-8 text-white shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome Back, {ToUperCaseFirstLetter(user?.name)}!
                        </h1>
                        <p className="text-white/90 text-lg">
                            Complete your payment information below
                        </p>
                    </div>
                </div>
            </div>

            {/* Patient Profile */}
            <ProfileUser
                id={user?.id || ''}
                name={user?.name || ''}
                email={user?.gmail || ''}
                status={user?.status ? 'Active' : 'No Active'}
                img={user?.avatar}
            />
        </>
    )
}

export default memo(HeaderLeftSide)