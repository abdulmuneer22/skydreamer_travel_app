/**
 * Author: Alberto Schiabel
 * Purpose: Centralization of every technical aspect of the app
 * Date: 07 March 2017
 *
 * Calling the api root url from here instead of separately calling it
 * from different methods can avoid distraction errors. Also, e.g.  you
 * wouldn't want to have separate timeout parameters for every HTTP call
 * that your methods perform, would you?
 */

const config = {
  api: {
    rootUrl: 'https://api.skydreamer:3000',
    timeout: 15000, // ms
    password: 'secret',
  },
  localStorage: {
    fileName: 'skydreamer_dump',
  },
};

export default config;
