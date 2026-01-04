import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [special, setSpecial] = useState("");
  const [yearExp, setYearExp] = useState("");
  const [bio, setBio] = useState("");

  // validazioni
  const [usernameValidationTXT, setUsernameValidationTXT] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [bioValidation, setBioValidation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const campiTXT = [
      fullName.trim(""),
      username.trim(""),
      password.trim(""),
      special,
      bio.trim(""),
    ];
    const campiNum = Number(yearExp);
    if (campiTXT.every((c) => c !== "" && campiNum > 0)) {
      console.log(campiTXT.concat(campiNum));
    } else console.error("Ricontrolla i campi");
  };

  // validazione username
  useEffect(() => {
    const isValid = [...username].some((char) => symbols.includes(char));
    if (username.trim("").length >= 6 && !isValid) {
      return setUsernameValidationTXT(true);
    } else return setUsernameValidationTXT(false);
  }, [username]);

  // validazione password
  useEffect(() => {
    const isValid =
      [...password].length >= 8 &&
      [...password].some((char) => letters.includes(char)) &&
      [...password].some((char) => letters.toUpperCase().includes(char)) &&
      [...password].some((char) => numbers.includes(char));
    if (isValid) {
      return setPasswordValidation(true);
    } else return setPasswordValidation(false);
  }, [password]);

  // validazione Descrizione
  useEffect(() => {
    const isValid =
      bio.trim("").split("").length > 10 && bio.trim("").split("").length <= 20;
    console.log(isValid);

    if (isValid) setBioValidation(true);
    else return setBioValidation(false);
  }, [bio]);

  return (
    <>
      <h1>Signup</h1>
      <div>
        <form action="submit" onSubmit={(e) => handleSubmit(e.target.value)}>
          <section>
            <input
              type="text"
              name="nome completo"
              placeholder="Nome completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </section>
          <section>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className={usernameValidationTXT ? "greenTXT" : "redTXT"}>
              Deve contenere solo alfanumerici e almeno 6 caratteri
            </p>
          </section>
          <section>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className={passwordValidation ? "greenTXT" : "redTXT"}>
              Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo
            </p>
          </section>
          <section>
            <label>Specializzazione</label>
            <select
              name="Spec"
              value={special}
              onChange={(e) => setSpecial(e.target.value)}
            >
              <option value="" disabled>
                Scegli
              </option>
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
            </select>
          </section>
          <section>
            <input
              type="number"
              placeholder="Anni di esperienza"
              value={yearExp}
              onChange={(e) => setYearExp(e.target.value)}
              min={0}
            />
          </section>
          <section>
            <textarea
              type="text"
              placeholder="Dettagli aggiuntivi"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <p className={bioValidation ? "greenTXT" : "redTXT"}>
              Deve contenere tra 100 e 1000 caratteri
            </p>
          </section>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
