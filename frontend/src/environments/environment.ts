export const BASE_URL = 'http://localhost:8080'


export const environments = {
    prodution: false,
    apiUrlAuthGoogle: BASE_URL + "/oauth2/authorization/google",
    apiUrlAuthGithub: BASE_URL + "/oauth2/authorization/github",
    apiUrlAuthMe: BASE_URL + "/api/auth/me",
    apiUrlAuthSuccess: BASE_URL + "/api/auth/success",
    apiUrlPlan: BASE_URL + "/api/plan",
}





// AUTHENTICATION ENDPOINTS
export const API_URL_AUTH_GOOGLE = BASE_URL + "/oauth2/authorization/google"
export const API_URL_AUTH_GITHUB = BASE_URL + "/oauth2/authorization/github"
export const API_URL_AUTH_ME = BASE_URL + "/api/auth/me"
export const API_URL_AUTH_SUCCESS = BASE_URL + "/api/auth/success"

// PLAN ENDPOINTS
export const API_URL_PLAN = BASE_URL + "/api/plan"

// PROJECT SESSION ENDPOINTS
export const API_URL_PROJECT_SESSION = BASE_URL + "/api/project-session"

// GENERATED CONTENT ENDPOINTS
export const API_URL_GENERATED_CONTENT = BASE_URL + "/api/generated-content"

