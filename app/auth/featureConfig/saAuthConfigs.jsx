// Configs for Next.js Auth System (sauth_configs)
// appConfigs.js
import Image from 'next/image';
import bgimg from '../../img/logobg.avif'; // outside public!
import {hiveRoutes} from '../../appConfigs/hiveRoutes'; 
import mosyThemeConfigs from '../../appConfigs/mosyTheme';

const commonRoot = "/"; // Adjust to your base path or env var if needed


const saAuthConfigs = {
  sessionPrefix: "GradersApp", // Unique prefix for session keys
  oauthTable: "graders",
  primkey: "primkey",

  // DB column mappings
  userIdCol: "grader_id",
  usernameCol: "grader_name",
  emailCol: "username",
  phoneCol: "phone",
  passwordCol: "password",
  sessionColumns : "grader_id,phone,grader_name,username,hive_site_id,hive_site_name",

  // Post-login redirect
  afterSplashPage:`${hiveRoutes.cms}/milkcollections/list`,

  // UI toggles
  showResetLink: false, // true || false
  showCreateAccount: false, // true || false

  // Routes (UI component files/pages, not PHP scripts)
  loginUrl: `${hiveRoutes.auth}/login`,
  registerUrl: `${hiveRoutes.auth}/register`,
  changePasswordUrl: `${hiveRoutes.auth}/resetpassword`,
  resetPasswordUrl: `${hiveRoutes.auth}/resetpassword`,
  
  //Api endpoints
  createUserApi : `${hiveRoutes.hiveBaseRoute}/api/${mosyThemeConfigs.mosySystemName}/accounts/createaccount`,

  // Login page background + UI widget choice
  loginBgImage: bgimg.src,
  loginWidget: "hive_login_center_wgt", // e.g., hive_login_center_wgt || hive_login_dark_clear_center_wgt
};

export default saAuthConfigs;
