import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const goToSignIn = () => {
        navigate('/signin');
    }

    const signUp = async () => {
        if(password == confirmPassword) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log('User created successfully with email:', userCredential.user.email);
                navigate('/');
            } catch (error) {
                setError(error.message);
                console.error('Error signing up:', error.message);
            }
        } else {
            setError('Write same as password in confirm field');
        }

        
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className='flex justify-center'>
                <h1 className="text-lg font-bold mb-4">Sign Up</h1>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password:
                </label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password:
                </label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            {error && <p className="text-red-500 text-xs italic mb-6">{error}</p>}
            <div className='flex justify-center'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={signUp}>
                    Sign Up
                </button>
            </div>
            <div className='flex justify-center'>
                <p onClick={goToSignIn} className=' underline mt-[20px] hover:cursor-pointer'>Sign In</p>
            </div>
        </div>
    );
}
