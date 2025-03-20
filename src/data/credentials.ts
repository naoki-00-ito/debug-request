export type Credential = RequestCredentials | 'none';

const credentials: Credential[] = ['none', 'include', 'omit', 'same-origin'];

export default credentials;
