import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Content = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [password, setPassword] = useState(false);
  const [Form, setForm] = useState({ site: '', Username: '', password: '' });
  const [allPasswords, setAllPasswords] = useState([]);

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('passwords'));
    if (saved) {
      setAllPasswords(saved);
    }
  }, []);

  const handleInput = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    if (Form.site === '' || Form.Username === '' || Form.password === '') {
      alert('Please fill all fields');
      return;
    }
    const newPassword = { ...Form, id: Date.now() };
    const updated = [...allPasswords, newPassword];
    setAllPasswords(updated);
    setForm({ site: '', Username: '', password: '' });
    localStorage.setItem('passwords', JSON.stringify(updated));
  };

  const handleChange = () => {
    if (ref.current.src.includes('images1.png')) {
      ref.current.src = 'src/assets/ye-removebg-preview.png';
    } else {
      ref.current.src = 'src/assets/images1.png';
    }

    passwordref.current.type =
      passwordref.current.type === 'password' ? 'text' : 'password';
  };

  const handleDelete = (e) => {
    const updatedPasswords = allPasswords.filter(item => item.id !== e);
    setAllPasswords(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));

   toast('DELETED SUCCESSFULLY 🥳!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
  };

  const handleEdit = (e) => {
    const edit = allPasswords.find(item => item.id === e);
    setForm({ site: edit.site, Username: edit.Username, password: edit.password });
    /// Remove the item from the list
    const updatedPasswords = allPasswords.filter(item => item.id !== e);
    setAllPasswords(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
    
    toast('Edit the text..🎈', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
  };

  const handleCopy = (e) => {
    const copy = allPasswords.find(item => item.id === e);
    navigator.clipboard.writeText(copy.password)
      .then(() => {
        toast.success('🔐 Password copied to clipboard!', {
          position: "bottom-center",
          autoClose: 1000,
        });
      })
      .catch(err => {
        toast.error('❌ Failed to copy password');
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <main className='relative mt-12.5 text-2xl w-full h-[87vh] overflow-scroll'>
      <div className='head flex justify-center w-full'>
        <h1 className='relative top-0 font-bold text-[28px]'>&lt;Pass
          <span className='text-green-600'>/OP</span>&gt;</h1>
      </div>

      <div className='flex flex-col gap-[19px] text-[17px] items-center relative w-full'>
        <input
          type="text"
          value={Form.site}
          name="site"
          placeholder='Enter the Website name'
          onChange={handleInput}
          className='outline-1 outline-green-500 w-[79vw] rounded-4xl px-1.5 mt-10'
        />
        <div className='flex gap-3 mb-7.5'>
          <input
            type="text"
            name="Username"
            value={Form.Username}
            placeholder='Enter the username'
            onChange={handleInput}
            className='outline-1 outline-green-500 w-[63vw] rounded-4xl px-1.5'
          />
          <span className='relative'>
            <input
              type='password'
              value={Form.password}
              ref={passwordref}
              name='password'
              placeholder='Password'
              onChange={handleInput}
              className='outline-1 outline-green-500 w-[15vw] rounded-4xl px-1.5'
            />
            <img
              ref={ref}
              onClick={handleChange}
              src="src/assets/images1.png"
              alt="see"
              className='absolute top-0 w-5.5 right-0 cursor-pointer'
            />
          </span>
        </div>
      </div>

      <div className='flex items-center justify-center p-3.5'>
        <button
          onClick={savePassword}
          className='bg-green-400 p-2 rounded-4xl w-42 hover:bg-green-600'
        >
          <span className='text-[15px] flex gap-4.5 items-center justify-center'>
            <span className='text-white font-bold'>Add Password</span>
            <lord-icon
              src="https://cdn.lordicon.com/rypcsrlk.json"
              trigger="hover"
              className='w-7.5 bg-white rounded-full'
            />
          </span>
        </button>
      </div>

      <div className='text-center flex justify-center'>
        {allPasswords.length === 0 ? (
          <h1 className='text-green-600 text-[20px] font-bold'>
            No Passwords Added Yet
          </h1>
        ) : (
          <table className='border-4 border-green-500 w-3/4 rounded-3xl overflow-hidden'>
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='border-4 border-green-700 w-[30%]'>Site</th>
                <th className='border-4 border-green-700 w-[15%]'>Username</th>
                <th className='border-4 border-green-700 w-[15%]'>Password</th>
                <th className='border-4 border-green-700 w-[10%]'>Action</th>
              </tr>
            </thead>
            <tbody>
              {allPasswords.map((item) => (
                <tr key={item.id} className='text-green-600 bg-gray-100 '>
                  <td id='site' className='border-2 border-green-600'><a href={item.site}>{item.site}</a></td>
                  <td id='User' className='border-2 border-green-600'>{item.Username}</td>
                  <td id='password' className='border-2 border-green-600'>{item.password}</td>
                  <td id='action' className='border-2 border-green-600 flex p-1 gap-x-4.5 w-auto'>
                    <span>
                      <img onClick={() => handleDelete(item.id)} src="src/assets/icons8-trash.gif" alt="Delete" width={21} />
                    </span>
                    <lord-icon
                      src="https://cdn.lordicon.com/fikcyfpp.json"
                      trigger="hover"
                      onClick={() => handleCopy(item.id)}
                      style={{ width: '22px', height: '22px' }}
                    ></lord-icon>
                    <img src="src/assets/text-box.gif" alt="edit" width={21} onClick={() => handleEdit(item.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
    </main>
  );
};

export default Content;
