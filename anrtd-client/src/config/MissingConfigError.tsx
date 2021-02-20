class MissingConfigError extends Error {
    constructor(parameterName: string) {
        super();
        this.message = `Configuation parameter ${parameterName} missing in environment.`;
    }
}

export default MissingConfigError;
