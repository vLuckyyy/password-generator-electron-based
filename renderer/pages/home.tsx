import React, {useState} from 'react';

const PasswordGenerator = () => {
    const [passwordLength, setPasswordLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');

    const generatePassword = () => {
        if (!(includeUppercase || includeLowercase || includeNumbers || includeSymbols)) {
            alert("Please select at least one type of characters for your password");
            return;
        }

        const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
        const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_-+=|/\?.>,<~';

        let passwordCharacters = '';
        if (includeLowercase) passwordCharacters += alphabetLower;
        if (includeUppercase) passwordCharacters += alphabetUpper;
        if (includeNumbers) passwordCharacters += numbers;
        if (includeSymbols) passwordCharacters += symbols;

        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * passwordCharacters.length);
            password += passwordCharacters[randomIndex];
        }
        setPassword(password);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="m-auto">
                <div className="component-header">Password Generator</div>
                <div className="config-row config-row-flex">
                    <label htmlFor="passwordLength">Password length: {passwordLength}</label>
                    <input
                        type="range"
                        id="passwordLength"
                        min="1" max="128"
                        value={passwordLength}
                        onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                        className="slider"/>
                </div>
                <div className="config-row">
                    <label>
                        <input type="checkbox" checked={includeUppercase}
                               onChange={(e) => setIncludeUppercase(e.target.checked)}/>
                        <span>Include uppercase letters</span>
                    </label>
                </div>
                <div className="config-row">
                    <label>
                        <input type="checkbox" checked={includeLowercase}
                               onChange={(e) => setIncludeLowercase(e.target.checked)}/>
                        <span>Include lowercase letters</span>
                    </label>
                </div>
                <div className="config-row">
                    <label>
                        <input type="checkbox" checked={includeNumbers}
                               onChange={(e) => setIncludeNumbers(e.target.checked)}/>
                        <span>Include numbers</span>
                    </label>
                </div>
                <div className="config-row">
                    <label>
                        <input type="checkbox" checked={includeSymbols}
                               onChange={(e) => setIncludeSymbols(e.target.checked)}/>
                        <span>Include symbols</span>
                    </label>
                </div>
                <button onClick={generatePassword} className="btn-blue">Generate Password</button>
                {password && (
                    <div className="password-output">
                        {password}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordGenerator;