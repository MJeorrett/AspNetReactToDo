class MissingConfigError extends Error {
    constructor(parameterName: string) {
        super();
        this.message = `Configuration parameter ${parameterName} missing in environment.`;
    }
}

export default MissingConfigError;
