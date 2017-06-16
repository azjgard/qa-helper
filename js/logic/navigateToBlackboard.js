qa_helper.navigateToBlackboard = new function() {

  function loadPage(address) {
    window.location.href = address;
  }

  function main() {
    var local      = window.location.href;

    var utiBase    = 'uti.blackboard.com';
    var loginBase  = utiBase + '/webapps/login';
    var portalBase = utiBase + '/webapps/portal/execute';

    var loginPage   = 'https://uti.blackboard.com/webapps/login?action=relogin';
    var coursesPage = 
      'https://uti.blackboard.com/webapps/blackboard/content/listContent' +
      '.jsp?course_id=_3607_1&content_id=_164396_1&mode=reset';


    // if not on Blackboard domain
    if (!local.includes(utiBase))        { loadPage(loginPage);           }
    else if (local.includes(loginBase))  { qa_helper.loginToBlackboard(); }
    else if (local.includes(portalBase)) { loadPage(coursesPage);         }
  }

  return main;
};
