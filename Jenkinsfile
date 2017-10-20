library "global_variables"
// This jenkinsfile was generated through the Fusion Portal on 2017-10-18 13:44:57-04:00

timestamps {
	try {

		// These variables can be changed to customize your pipeline
		APP_ID = 'Network-Diagramming-Tool'
		TARGET_RELEASE = '0.1'
		MARKET = 'uscm'
		PI_PORTFOLIO = 'eCommerce'
		ENVIRONMENT = 'dev'
		EMAIL_RECIPIENTS = 'mark.temple@libertymutual.com'
		DIST_DIR = 'dist'
		BUILD_DIR = '.'
		BUILD_FILE = 'build.sh'
		BUILD_TARGET = ''
		BUILD_SWITCHES = ''
		BUILD_PROPS = ''
		BUILD_TOOL = 'custom'
		CUSTOM_BUILD_CMD = './build.sh'
		JAVA_VER = ''
		NODE_VER = 'Node6'
		CONFIG_FILE_DIR = ''
		STATIC_CODE_ANALYSIS = 'false'
		SCM = 'GIT'
		REPO_LIST = 'https://bitbucket.fusion.lmig.com/scm/dss/network-diagramming-tool.git'

		// This function sets up the pipeline environment
		pipe_config (
			APP_ID: APP_ID,
			TARGET_RELEASE: TARGET_RELEASE,
			MARKET: MARKET,
			PI_PORTFOLIO: PI_PORTFOLIO,
			DIST_DIR: DIST_DIR,
			BUILD_DIR: BUILD_DIR,
			BUILD_FILE: BUILD_FILE,
			BUILD_TARGET: BUILD_TARGET,
			BUILD_TOOL: BUILD_TOOL,
			JAVA_VER: JAVA_VER,
			SCM: SCM,
			CONFIG_FILE_DIR: CONFIG_FILE_DIR,
			EMAIL_RECIPIENTS: EMAIL_RECIPIENTS,
			NODE_VER: NODE_VER
		)

		//This function downloads your application code
		def REVS = git_loadAndGetRevisionHash (
						GIT_URLS: REPO_LIST,
						WORKSPACE_FLATTEN: 'YES' 
					)


		stage('Build App') {
			dash_build (
				APP_ID: APP_ID,
				MARKET: MARKET,
				BUILD_VERSION:BUILD_VERSION,
				TARGET_RELEASE: TARGET_RELEASE,    
				BUILD_DIR: BUILD_DIR,
				BUILD_FILE: BUILD_FILE,
				BUILD_TARGET: BUILD_TARGET,
				BUILD_SWITCHES: BUILD_SWITCHES,
				BUILD_PROPS: BUILD_PROPS,
				DIST_DIR: DIST_DIR,
				CONFIG_FILE_DIR: CONFIG_FILE_DIR,
				BUILD_TOOL: BUILD_TOOL,
    			CUSTOM_BUILD_CMD: CUSTOM_BUILD_CMD,
				SCM: SCM,
				GIT_URLS: REPO_LIST,
				REVS: REVS
			) 
		} // End build stage

		stage('Build Docker Image') {
			build_docker (
				DTR_ENV: 'prod'
			)
		} // End build docker image stage

		stage('Docker Deploy') {
			fusion_parseFusionFile (
				APP_ID: APP_ID,
				MARKET: MARKET,
				TARGET_RELEASE: TARGET_RELEASE, 
				BUILD_VERSION: BUILD_VERSION,
				ENVIRONMENT: ENVIRONMENT,
				APPROVAL_PROMPT: 'no',
				CONFIG_VERSION: ''
			)
		} // End docker deploy stage

	} 
	catch(err) {
		node {
			env.jobstatus = 'failed'
			env.END_PHASE_VALUE = PHASE_VALUE
			env.END_PHASE_STRING = PHASE_STRING
			throw err
		}
	}
	finally {
		postbuild()
	}
} 
