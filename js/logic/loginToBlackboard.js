qa_helper.loginToBlackboard = new function() {

  function getField(name) {
    var input, question;

    question = "There is presently no QA " + name + " on record." +
               " What is your blackboard " + name + "?";

    while (!input) { input = prompt(question); }

    return input;
  }

  function setLocalFields(username, password) {
    localStorage.setItem('blackboardUsername', username);
    localStorage.setItem('blackboardPassword', password);
  }

  function submitLoginForm(user, password) {
    document.getElementById('user_id').value  = user;
    document.getElementById('password').value = password;
    document.getElementById('entry-login').click() 
  }

  function main() {
    var user, password;

    user     = localStorage.getItem("blackboardUsername");
    password = localStorage.getItem("blackboardPassword");

    if (!user)     { user     = getField('username'); }
    if (!password) { password = getField('password'); }

    if (user && password) {
      setLocalFields(user, password);
      submitLoginForm(user, password);
    }
  }

  return main;
}
