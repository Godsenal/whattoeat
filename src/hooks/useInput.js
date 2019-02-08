import { useState } from 'react';

// 재사용할 로직이 없게 코드를 짜버렸다

function useInput(initialVal = '') {
  const [val, setVal] = useState(initialVal);
  const handleChange = e => setVal(e.target.value);
  return [val, handleChange];
}

export default useInput;
