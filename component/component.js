/*!!!!!!!!!!!Do not change anything between here (the DRIVERNAME placeholder will be automatically replaced at buildtime)!!!!!!!!!!!*/
import ClusterDriver from 'shared/mixins/cluster-driver';
// do not remove LAYOUT, it is replaced at build time with a base64 representation of the template of the hbs template
// we do this to avoid converting template to a js file that returns a string and the cors issues that would come along with that
const LAYOUT;
const LANGUAGE;
/*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/


/*!!!!!!!!!!!GLOBAL CONST START!!!!!!!!!!!*/
// EMBER API Access - if you need access to any of the Ember API's add them here in the same manner rather then import them via modules, since the dependencies exist in rancher we dont want to expor the modules in the amd def
const computed     = Ember.computed;
const observer     = Ember.observer;
const get          = Ember.get;
const set          = Ember.set;
const setProperties= Ember.setProperties;
const service      = Ember.inject.service;
const all          = Ember.RSVP.all;
const reject       = Ember.RSVP.reject;
const resolve      = Ember.RSVP.resolve
const next         = Ember.run.next;
const equal        = Ember.computed.equal;
/*!!!!!!!!!!!GLOBAL CONST END!!!!!!!!!!!*/

const languages = LANGUAGE;
const DATA_DISK = 'DATA_DISK'
const SYSTEM_DISK = 'SYSTEM_DISK'

const BAND_WIDTH = [
  {
    label: 'clusterNew.tencenttke.bandwidthType.bandwidth',
    value: 'BANDWIDTH_POSTPAID_BY_HOUR'
  },
  {
    label: 'clusterNew.tencenttke.bandwidthType.traffic',
    value: 'TRAFFIC_POSTPAID_BY_HOUR'
  }
];

const DISKS = ['LOCAL_BASIC', 'LOCAL_SSD', 'CLOUD_BASIC', 'CLOUD_PREMIUM', 'CLOUD_SSD', 'CLOUD_BSSD', 'CLOUD_TSSD'];
const OS_IMAGE = [
  {
      "Alias": "CentOS 7.2 64bit",
      "Arch": "amd64",
      "ImageId": "img-rkiynh11",
      "OsCustomizeType": "GENERAL",
      "OsName": "centos7.2x86_64",
      "SeriesName": "centos7.2x86_64",
  },
  {
      "Alias": "CentOS 7.6 64bit",
      "Arch": "amd64",
      "ImageId": "img-9qabwvbn",
      "OsCustomizeType": "GENERAL",
      "OsName": "centos7.6.0_x64",
      "SeriesName": "centos7.6.0_x64",
  },
  {
      "Alias": "TencentOS Server 2.4",
      "Arch": "amd64",
      "ImageId": "img-hdt9xxkt",
      "OsCustomizeType": "GENERAL",
      "OsName": "tlinux2.4x86_64",
      "SeriesName": "TencentOS Server 2.4",
  },
  {
      "Alias": "Ubuntu Server 16.04.1 LTS 64bit",
      "Arch": "amd64",
      "ImageId": "img-4wpaazux",
      "OsCustomizeType": "GENERAL",
      "OsName": "ubuntu16.04.1 LTSx86_64",
      "SeriesName": "ubuntu16.04.1 LTSx86_64",
  },
  {
      "Alias": "Ubuntu Server 18.04.1 LTS 64bit",
      "Arch": "amd64",
      "ImageId": "img-pi0ii46r",
      "OsCustomizeType": "GENERAL",
      "OsName": "ubuntu18.04.1x86_64",
      "SeriesName": "ubuntu18.04.1x86_64",
  },
  {
      "Alias": "Ubuntu Server 20.04.1 LTS 64bit",
      "Arch": "amd64",
      "ImageId": "img-22trbn9x",
      "OsCustomizeType": "GENERAL",
      "OsName": "ubuntu20.04x86_64",
      "SeriesName": "ubuntu20.04x86_64",
  },
  {
      "Alias": "CentOS 7.8 64bit",
      "Arch": "amd64",
      "ImageId": "img-3la7wgnt",
      "OsCustomizeType": "GENERAL",
      "OsName": "centos7.8.0_x64",
      "SeriesName": "centos7.8.0_x64",
  },
  {
      "Alias": "CentOS 8.0 64bit",
      "Arch": "amd64",
      "ImageId": "img-25szkc8t",
      "OsCustomizeType": "GENERAL",
      "OsName": "centos8.0x86_64",
      "SeriesName": "centos8.0x86_64",
  },
  {
      "Alias": "TencentOS Server 2.4 (TK4)",
      "Arch": "amd64",
      "ImageId": "img-9axl1k53",
      "OsCustomizeType": "GENERAL",
      "OsName": "tlinux2.4(tkernel4)x86_64",
      "SeriesName": "TencentOS Server 2.4 (TK4)",
      "Status": "online"
  },
  {
      "Alias": "TencentOS Server 3.1 (TK4)",
      "Arch": "amd64",
      "ImageId": "img-eb30mz89",
      "OsCustomizeType": "GENERAL",
      "OsName": "tlinux3.1x86_64",
      "SeriesName": "TencentOS Server 3.1 (TK4)",
  }
];
const CLUSTER_TYPES = [
  {
    label: 'clusterNew.tencenttke.clusterType.independent',
    value: 'INDEPENDENT_CLUSTER'
  },
  {
    label: 'clusterNew.tencenttke.clusterType.managed',
    value: 'MANAGED_CLUSTER'
  },
];

const DEFAULT_NODE_GROUP_CONFIG = {
  nodePoolName:   'default-nodepool',
  systemDiskSize: 20,
  dataDiskSize:   0,
  instanceNum:    1,
  bandwidth:      10,
  bandwidthType:  'TRAFFIC_POSTPAID_BY_HOUR',
  systemDiskType: null,
  dataDiskType:   null,
  osName:         null,
  subnetId:       null,
  keyPair:        null,
  instanceType:   null,
  securityGroup:  null,
  type:           'nodePool',
}

const CONTAINER = [{
  label: 'docker',
  value: 'docker',
},{
  label: 'containerd',
  value: 'containerd',
}]

/*!!!!!!!!!!!DO NOT CHANGE START!!!!!!!!!!!*/
export default Ember.Component.extend(ClusterDriver, {
  driverName:  '%%DRIVERNAME%%',
  app:         service(),
  router:      service(),
  session:     service(),
  intl:        service(),

  layout:            null,
  configField:       'tkeConfig',
  config: null,

  step:               1,
  testAry:            [],
  clusterChoices:     [],
  regionChoices:      [],
  versionChoices:     [],
  osChoices:          [],
  nodePoolList:        [],
  bandWidthChoices:   BAND_WIDTH,
  vpcChoices:         null,
  keyChoices:         null,
  allSubnets:         null,
  allInstances:       null,
  securityGroupChoices: null,
  nodePoolMasterList:  [{}],
  nodePoolWorkerList:  [],
  clusterTypeChoices:  CLUSTER_TYPES,
  clusterLevelChoices: [],
  diskList:            {},
  diskConfigSet:       [],
  systemDiskChoices:   [],
  dataDiskChoices:     [],
  zoneChoices:         [],
  containerChoices:    CONTAINER,
  loadedRegionFor:     '',

  cloudCredentialDriverName: 'tencent',

  isNew:   equal('mode', 'new'),
  editing: equal('mode', 'edit'),


  init() {
    // This does on the fly template compiling, if you mess with this :cry:
    const decodedLayout = window.atob(LAYOUT);
    const template      = Ember.HTMLBars.compile(decodedLayout, {
      moduleName: 'shared/components/cluster-driver/driver-%%DRIVERNAME%%/template'
    });
    set(this,'layout', template);
    this._super(...arguments);

    const lang = get(this, 'session.language');

    get(this, 'intl.locale');
    this.loadLanguage(lang);

    let config      = get(this, 'config');

    if ( !config ) {
      config = this.get('globalStore').createRecord({
        type:           'tkeConfig',
        clusterCidr:    '172.16.0.0/16',
        clusterVersion: null,
        region:         'ap-guangzhou',
        vpcId:          null,
        zoneId:         null,
        subnetId:       null,
        securityGroup:  null,
        instanceType:   null,
        osName:         'tlinux3.1x86_64',
        bandwidthType:  'TRAFFIC_POSTPAID_BY_HOUR',
        bandwidth:      10,
        keyId:          null,
        clusterType:    'MANAGED_CLUSTER',
        clusterLevel:   'L5',
        systemDiskSize: 20,
        dataDiskSize:   0,
        ecsCount:       3,
        container:      'containerd',
        ipvs:           false,
        component:      JSON.stringify([{
          "addonName": "CBS",
          "addonParam": "{\"kind\":\"App\",\"spec\":{\"chart\":{\"chartName\":\"cbs\",\"chartVersion\":\"1.0.9\"},\"values\":{\"values\":[],\"rawValues\":\"e30=\",\"rawValuesType\":\"json\"}}}"
        }]),
        clusterEndpoint: true,
      });

      set(this, 'config', config);
    } else {
      this.initConfig(config);
    }
  },
  /*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/
  // Add custom validation beyond what can be done from the config API schema
  validate() {
    // Get generic API validation errors
    this._super();
    const intl = get(this, 'intl');
    var errors = get(this, 'errors')||[];
    if ( !get(this, 'cluster.name') ) {
      errors.push(intl.t('clusterNew.tencenttke.cluster.name.required'));
    }

    // Add more specific errors

    // Set the array of errors for display,
    // and return true if saving should continue.
    if ( get(errors, 'length') ) {
      set(this, 'errors', errors);
      return false;
    } else {
      set(this, 'errors', null);
      return true;
    }
  },

  actions: {
    async tencentLogin(cb) {
      try {
        let step;
        let hash = [
          this.fetchRegions(),
          this.fetchZones(),
          this.fetchVpcs(),
          this.fetchVersions(),
          this.fetchSubnets(),
          this.fetchSecurityGroups(),
          this.fetchClusterLevelAttribute(),
        ];

        this.regionDidChange();

        if (this.isImportProvider && this.isNew){
          step = 1.5;
          hash = [this.fetchRegions()]
        } else if (this.isImportProvider && !this.isNew) {
          step = 4;
        } else {
          step = 2;
        }

        await all(hash);
        set(this, 'step', step);
        cb && cb(true);
      } catch (e) {
        const errors = [];

        errors.push(get(e, 'body.Message') || get(e, 'body.message') || e);
        set(this, 'errors', errors);
        cb && cb();
      }

      this.getImages();
    },

    registerCluster(cb){
      setProperties(this, { 'errors': null });

      const errors = get(this, 'errors') || [];
      const clusterId = get(this, 'config.clusterId')
      const intl    = get(this, 'intl');

      if ( !clusterId ) {
        errors.push(intl.t('clusterNew.tencenttke.clusterSelect.required'));
      }

      if (errors.length > 0) {
        set(this, 'errors', errors);
        cb();

        return;
      }

      const config = {
        imported: true,
        clusterName: get(this, 'config.name'),
        tkeCredentialSecret: get(this, 'primaryResource.cloudCredentialId'),
        clusterId,
        region: get(this, 'config.region'),
        clusterEndpoint: {
          enable: get(this, 'config.clusterEndpoint')
        }
      }

      set(this, 'cluster.tkeConfig', config);

      this.send('driverSave', cb);
    },

    loadNodeConfig(cb) {
      setProperties(this, { 'errors': null });

      const errors = get(this, 'errors') || [];
      const intl = get(this, 'intl');

      this.toValidateRequired(this.config, ['clusterCidr', 'vpcId', 'subnetId', 'securityGroup'], errors)

      const cidrIPV4RegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/\d{1,2}$/;

      if(!cidrIPV4RegExp.test(get(this, 'config.clusterCidr'))){
        errors.push(intl.t('clusterNew.tencenttke.clusterCidr.formatError'));
      }

      if (errors.length > 0) {
        set(this, 'errors', errors);
        cb();

        return;
      }

      return all([
        this.fetchSubnets(),
        this.fetchInstanceTypes(),
        this.fetchKeyPairs(),
        this.fetchDiskConfigQuota(),
      ]).then(() => {
        if(get(this, 'config.clusterType') === 'INDEPENDENT_CLUSTER'){
          set(this, 'step', 3);
        } else {
          set(this, 'step', 4);

          if(!this.nodePoolList || !this.nodePoolList.length){
            this.send('addNodePool');
          }
        }
        cb(true);
      }).catch((error) => {
        console.error(error);
        cb(false);
      });
    },

    loadWorkerConfig(cb){
      set(this, 'step', 4);
      if(!this.nodePoolList || !this.nodePoolList.length){
        this.send('addNodePool');
      }
    },

    save(cb) {
      setProperties(this, { 'errors': null });
      const config = this.formatConfig();
      const errors = get(this, 'errors') || [];
      const nodePoolList = get(this, 'nodePoolList');

      nodePoolList.forEach(item=>{
        this.toValidateRequired(item, ['nodePoolName', 'instanceType', 'osName', 'keyPair', 'securityGroup'], errors);
      });

      if (errors.length > 0) {
        set(this, 'errors', errors);
        cb();

        return;
      }

      set(this, 'cluster.tkeConfig', config);

      this.send('driverSave', cb);
    },

    cancel(){
      // probably should not remove this as its what every other driver uses to get back
      get(this, 'router').transitionTo('global-admin.clusters.index');
    },

    finishAndSelectCloudCredential(cred) {
      if (cred) {
        set(this, 'primaryResource.cloudCredentialId', get(cred, 'id'));

        this.send('tencentLogin');
      }
    },
    addNodePool() {
      let nodePoolList = get(this, 'nodePoolList');
      const ngConfig = {
        ...DEFAULT_NODE_GROUP_CONFIG,
        instanceType:   this.getDefaultSelected(this.instanceChoices, 'SA2.MEDIUM2'),
        osName:         this.getDefaultSelected(this.osChoices, 'tlinux3.1x86_64'),
        systemDiskType: this.getDefaultSelected(this.systemDiskTypeChoices),
        dataDiskType:   this.getDefaultSelected(this.dataDiskTypeChoices),
        subnetId:       this.getDefaultSelected(this.subnetChoices),
        keyPair:        this.getDefaultSelected(this.keyChoices),
        securityGroup:  this.getDefaultSelected(this.securityGroupChoices),
        nodePoolName:   '',
      };

      if (!Array.isArray(nodePoolList)) {
        nodePoolList = [];
      }

      nodePoolList.pushObject(ngConfig);

      set(this, 'nodePoolList', nodePoolList);
    },
    removeNodePool(nodeGroup) {
      let { nodePoolList } = this;

      if (nodePoolList && nodePoolList.length) {
        nodePoolList.removeObject(nodeGroup);
      }

      set(this, 'nodePoolList', nodePoolList);
    },
    masterSystemDiskChange(disk){
      set(this.config, 'minSystemDiskSize', disk.minDiskSize);
      set(this.config, 'maxSystemDiskSize', disk.maxDiskSize);
    },

    masterDataDiskChange(disk){
      set(this.config, 'minDataDiskSize', disk.minDiskSize);
      set(this.config, 'maxDataDiskSize', disk.maxDiskSize);
    },
    workerSystemDiskChange(idx, disk){
      set(this.nodePoolList[idx], 'minSystemDiskSize', disk.minDiskSize);
      set(this.nodePoolList[idx], 'maxSystemDiskSize', disk.maxDiskSize);
    },

    workerDataDiskChange(idx, disk){
      set(this.nodePoolList[idx], 'minDataDiskSize', disk.minDiskSize);
      set(this.nodePoolList[idx], 'maxDataDiskSize', disk.maxDiskSize);
    },
  },

  languageDidChanged: observer('intl.locale', function() {
    const lang = get(this, 'intl.locale');
    if (lang) {
      this.loadLanguage(lang[0]);
    }

  }),

  initConfig(config){
    const intl = get(this, 'intl');

    const nodePool = [];

    const { clusterEndpoint = {}, clusterBasicSettings = {}, clusterCIDRSettings = {}, nodePoolList = [], runInstancesForNode = {}, clusterAdvancedSettings = {}, extensionAddon = [] } = config;

    nodePoolList.forEach(item=>{
      const {autoScalingGroupPara, launchConfigurePara } = item;
      const obj = {
        clusterId: item.clusterId,
        nodePoolId: item.nodePoolId,
        nodePoolName: item.name,
        osName: item.nodePoolOs,
        instanceNum: autoScalingGroupPara.desiredCapacity,
        subnetId: autoScalingGroupPara.subnetIds[0],
        instanceType: launchConfigurePara.instanceType,
        systemDiskSize: get(launchConfigurePara, 'systemDisk.diskSize'),
        systemDiskType: get(launchConfigurePara, 'systemDisk.diskType'),
        dataDiskSize: get(launchConfigurePara, 'dataDisks.diskSize'),
        dataDiskType: get(launchConfigurePara, 'dataDisks.diskType'),
        bandwidthType: launchConfigurePara.internetChargeType,
        bandwidth: launchConfigurePara.internetMaxBandwidthOut,
        keyPair: launchConfigurePara.keyIds[0],
        securityGroup: launchConfigurePara.securityGroupIds[0],
      };

      let displayShowValue = {};

      if(!this.isNew){
        displayShowValue = {
          displayInstanceType: obj.instanceType,
          displaySystemDiskType: intl.t(`clusterNew.tencenttke.disk.${obj.systemDiskType}`),
          displayDataDiskType: obj.dataDiskType ? intl.t(`clusterNew.tencenttke.disk.${obj.dataDiskType}`) : null,
          displayBandwidthType: intl.t(this.configNameDisplay(obj.bandwidthType, get(this, 'bandWidthChoices'))),
          securityGroup: obj.securityGroup,
          displayOsName: obj.osName,
        }
      }

      nodePool.push(Object.assign(obj, displayShowValue));
    });

    const out = {
      clusterEndpoint: clusterEndpoint.enable === undefined ? true : !!clusterEndpoint.enable,
      imported: config.imported,
      region: config.region,
      subnetId: get(clusterEndpoint, 'subnetId'),
      securityGroup: clusterEndpoint.securityGroup,
      osName: clusterBasicSettings.clusterOs,
      clusterType: clusterBasicSettings.clusterType,
      clusterVersion: clusterBasicSettings.clusterVersion,
      vpcId: clusterBasicSettings.vpcId,
      clusterLevel: clusterBasicSettings.clusterLevel,
      clusterCidr: clusterCIDRSettings.clusterCIDR,
      ecsCount: get(runInstancesForNode, 'instanceCount'),
      instanceType: get(runInstancesForNode, 'instanceType'),
      bandwidthType: get(runInstancesForNode, 'internetChargeType'),
      bandwidth: get(runInstancesForNode, 'internetMaxBandwidthOut'),
      keyPair: (get(runInstancesForNode, 'keyIds') || [])[0],
      zoneId: get(runInstancesForNode ,'zone'),
      systemDiskType: get(runInstancesForNode, 'systemDisk.diskType'),
      systemDiskSize: get(runInstancesForNode, 'systemDisk.diskSize'),
      dataDiskType: get(runInstancesForNode, 'dataDisk.diskType'),
      dataDiskSize: get(runInstancesForNode, 'dataDisk.diskSize'),
      container: clusterAdvancedSettings.containerRuntime,
      ipvs: clusterAdvancedSettings.ipvs,
      component: JSON.stringify(extensionAddon)
    };

    set(this, 'nodePoolList', nodePool);
    set(this, 'config', out);
  },

  loadLanguage(lang) {
    const translation = languages[lang] || languages['en-us'];
    const intl = get(this, 'intl');

    if (intl.addTranslation) {
      intl.addTranslation(lang, 'clusterNew.tencenttke', translation.clusterNew.tencenttke);
    } else {
      intl.addTranslations(lang, translation);
    }

    intl.translationsFor(lang);
    set(this, 'refresh', false);
    next(() => {
      set(this, 'refresh', true);
      set(this, 'lanChanged', +new Date());
    });
  },

  clusterNameDidChange: observer('cluster.name', function() {
    set(this, 'config.clusterName', get(this, 'cluster.name'));
  }),

  subnetIdObserver: observer('selectedZone', 'allSubnets', 'config.vpcId', 'vpcChoices.[]', function() {
    if ( !get(this, 'selectedZone') || !get(this, 'allSubnets') ) {
      return;
    }
    const subnets = get(this, 'allSubnets').filter((subnet) => get(subnet, 'vpcId') === get(this, 'config.vpcId') && get(subnet, 'zone') === get(this, 'selectedZone.value'));
    const subnetId = get(this, 'config.subnetId');

    if ( get(this, 'isNew') && get(subnets, 'length') ) {
      set(this, 'config.subnetId', get(subnets, 'firstObject.value'));
    } else {
      const found = subnets.findBy('value', subnetId);

      if ( !found ) {
        set(this, 'config.subnetId', null);
      }
    }
  }),

  regionDidChange: observer('config.region', function() {
    const loadedRegionFor = get(this, 'loadedRegionFor');
    const region = get(this, 'config.region');

    if(loadedRegionFor === region){
      return;
    }


    if (this.isImportProvider && region) {
      set(this, 'config.clusterId', null);

      this.fetchClusters();
      set(this, 'loadedRegionFor', region);

      return;
    }

    this.fetchVpcs();
    this.fetchZones();
    this.fetchSubnets();
    this.fetchInstanceTypes();
    this.fetchSecurityGroups();

    set(this, 'loadedRegionFor', region);
  }),

  isActive: computed('cluster', function() {
    return get(this, 'cluster.isActive');
  }),

  isImportProvider: computed('router.currentRoute.queryParams', 'config.imported', function() {
    const { router } = this;
    const imported = get(this, 'config.imported');

    return imported || get(router, 'currentRoute.queryParams.importProvider') === 'tke';
  }),

  cloudCredentials: computed('model.cloudCredentials', function() {
    const { model: { cloudCredentials } } = this;

    return cloudCredentials.filter((cc) => get(cc, 'tkecredentialConfig'));
  }),
  selectedCloudCredential: computed('primaryResource.cloudCredentialId', 'model.cloudCredentials.length', function() {
    return get(this, 'model.cloudCredentials').findBy('id', get(this, 'primaryResource.cloudCredentialId'))
  }),

  subnetChoices: computed('allSubnets', 'config.vpcId', 'config.zoneId', 'vpcChoices.[]', function() {
    if (!get(this, 'allSubnets') ) {
      return [];
    }

    if(!get(this, 'config.zoneId') && get(this, 'config.subnetId')){
      const selected = get(this, 'allSubnets').findBy('value', get(this, 'config.subnetId')) || {};

      set(this, 'config.zoneId', get(selected, 'zone'));
    }
    const subnets = get(this, 'allSubnets').filter((subnet) =>{
      if(get(this, 'config.zoneId')){
        return get(subnet, 'vpcId') === get(this, 'config.vpcId') && get(subnet, 'zone') === get(this, 'config.zoneId');
      } 
      return get(subnet, 'vpcId') === get(this, 'config.vpcId');
    });

    this.setDefaultSelected(subnets, 'config.subnetId');
    !this.isNew && this.setNodePoollNameDisplay(subnets, 'subnetId');

    return subnets;
  }),

  instanceChoices: computed('allInstances', 'config.zoneId', function() {
    const zoneId = get(this, 'config.zoneId');
    const allInstances = get(this, 'allInstances') || {};
    const instances = allInstances[zoneId];

    if (!allInstances || !zoneId) {
      return [];
    }

    this.setDefaultSelected(instances, 'config.instanceType', 'SA2.MEDIUM2');

    return instances;
  }),

  configNameDisplay(val, choices, localizedLabel){
    if(!val || !choices){
      return 'n/a'
    }

    const selected = choices.findBy('value', val) || {};
    const label = get(selected, 'label');

    if(localizedLabel && label){
      const intl = get(this, 'intl');

      return intl.t(label)
    }

    return label || 'n/a';
  },

  regionShowValue: computed('regionChoices.[]', 'config.region', 'intl.locale', function() {
    return this.configNameDisplay(get(this, 'config.region'), get(this, 'regionChoices'), true);
  }),
  zoneShowValue: computed('zoneChoices.[]', 'config.zoneId', 'intl.locale', function() {
    return this.configNameDisplay(get(this, 'config.zoneId'), get(this, 'zoneChoices'));
  }),
  clusterTypeShowValue: computed('config.clusterType', 'intl.locale', function() {
    return this.configNameDisplay(get(this, 'config.clusterType'), get(this, 'clusterTypeChoices'), true);
  }),
  vpcShowValue: computed('vpcChoices.[]', 'config.vpcId', 'intl.locale', function() {
    return this.configNameDisplay(get(this, 'config.vpcId'), get(this, 'vpcChoices'));
  }),
  subnetShowValue: computed('subnetChoices.[]', 'config.subnetId', 'intl.locale', function() {
    return this.configNameDisplay(get(this, 'config.subnetId'), get(this, 'subnetChoices'));
  }),
  osShowValue: computed('osChoices.[]', 'config.osName', 'intl.locale', function() {
    return this.configNameDisplay(get(this, 'config.osName'), get(this, 'osChoices'));
  }),
  securityGroupShowValue: computed('securityGroupChoices.[]', 'config.securityGroup', 'intl.locale', function() {
    return this.configNameDisplay(get(this, 'config.securityGroup'), get(this, 'securityGroupChoices'));
  }),
  instanceTypeShowValue: computed('instanceChoices.[]', 'config.instanceType', 'intl.locale', function() {
    return this.configNameDisplay(get(this, 'config.instanceType'), get(this, 'instanceChoices'));
  }),
  dataDiskTypeShowValue: computed('dataDiskChoices.[]', 'config.dataDiskType', 'intl.locale', function() {
    return this.configNameDisplay(get(this, 'config.systemDiskType'), get(this, 'dataDiskChoices'), true);
  }),
  systemDiskTypeShowValue: computed('systemDiskChoices.[]', 'config.systemDiskType', 'intl.locale', function() {
    return this.configNameDisplay(get(this, 'config.systemDiskType'), get(this, 'systemDiskChoices'), true);
  }),
  bandwidthTypeShowValue: computed('bandWidthChoices.[]', 'config.bandwidthType', 'intl.locale', function() {
    return this.configNameDisplay(get(this, 'config.bandwidthType'), get(this, 'bandWidthChoices'), true);
  }),
  keyPairShowValue: computed('keyChoices.[]', 'config.keyPair', 'intl.locale', function() {
    return this.configNameDisplay(get(this, 'config.keyPair'), get(this, 'keyChoices'))
  }),
  componentShowValue: computed('config.component', 'intl.locale', function() {
    const components = JSON.parse(get(this, 'config.component')) || [];

    if(!components.length){
      return 'n/a'
    }
    const componentNames = components.map(item=>item.addonName);
    return componentNames.join();
  }),
  clusterEndpointShowValue: computed('config.clusterEndpoint', 'intl.locale', function() {
    const intl = get(this, 'intl');

    return intl.t(`clusterNew.tencenttke.proxy.${get(this, 'config.clusterEndpoint') ? 'outer' : 'inner'}`);
  }),
  

  nodePoollInstanceTypeChange: observer('nodePoolList.@each.{instanceType}', 'diskList', function(){
    const nodePoolList = get(this, 'nodePoolList') || [];

    nodePoolList.forEach(item=>{
      const instanceType = get(item, 'instanceType');
      const disk = this.getDiskChoices(instanceType);
      if(disk){
        set(item, 'systemDiskTypes', disk.systemDiskTypes);
        set(item, 'dataDiskTypes', disk.dataDiskTypes);
        set(item, 'systemDiskType', this.getDefaultSelected(disk.systemDiskTypes));
        set(item, 'dataDiskType', this.getDefaultSelected(disk.dataDiskTypes));

        set(item, 'minSystemDiskSize', disk.systemDiskTypes[0].minDiskSize);
        set(item, 'maxSystemDiskSize', disk.systemDiskTypes[0].maxDiskSize);
        set(item, 'minDataDiskSize', disk.dataDiskTypes[0].minDiskSize);
        set(item, 'maxDataDiskSize', disk.dataDiskTypes[0].maxDiskSize);
      }
    })
  }),
  masterInstanceTypeChange: observer('config.instanceType', 'diskList', function(){
    if(get(this, 'config.clusterType') !== 'INDEPENDENT_CLUSTER'){
      return;
    }
    const instanceType = get(this, 'config.instanceType');
    const disk = this.getDiskChoices(instanceType);
    if(disk){
      set(this, 'systemDiskChoices', disk.systemDiskTypes);
      set(this, 'dataDiskChoices', disk.dataDiskTypes);
      set(this, 'config.systemDiskType', this.getDefaultSelected(disk.systemDiskTypes));
      set(this, 'config.dataDiskType', this.getDefaultSelected(disk.dataDiskTypes));
      this.send('masterSystemDiskChange', disk.systemDiskTypes[0])
      this.send('masterDataDiskChange', disk.dataDiskTypes[0])
    }
  }),

  kubernetesVersionDisabled: computed('intl.locale', 'config.clusterVersion', function() {
    const kubernetesVersion = get(this, 'config.clusterVersion');
    const versionChoices = get(this, 'versionChoices') || [];

    return versionChoices.find(v=>{
      return v.value === kubernetesVersion && !v.rancherEnabled
    })
  }),

  nodePoolActive: computed('nodePoolList.@each.{nodePoolId,nodePoolList}', function() {
    const list = get(this, 'nodePoolList') || [];

    return list.every((item) => {
      return item.nodePoolId && item.clusterId;
    })
  }),

  queryFromTencent(resource, externalParams = {}) {
    const cloudCredentialId = get(this, 'primaryResource.cloudCredentialId');
    const url = `/meta/tke/${resource}`
    const query = Object.assign({}, externalParams, {
      cloudCredentialId,
    })

    if(resource !== 'regions'){
      query.regionId = get(this, 'config.region') || '';
    }

    const req = {
      url:     `${ url }?${ this.getQueryParamsString(query) }`,
      method:  'GET',
    };

    return get(this, 'globalStore').rawRequest(req).then((xhr) => {
      const error = get(xhr, 'body.error');

      if ( error )  {
        set(this, 'errors', [error]);

        return reject(xhr);
      }

      return get(xhr, 'body.Response') || JSON.parse(get(xhr, 'body'));
    }).catch((xhr) => {
      let error = '';
      const message = get(xhr, 'body.message')
      if(message && message.includes('TencentCloudSDKError')){
        error = this.tencentCloudSDKError(message)['Message'];
      } else {
        error = get(xhr, 'body.error') || JSON.stringify(xhr);
      }

      set(this, 'errors', [error]);

      return reject(error);
    });
  },

  tencentCloudSDKError(error){
    const body = error.replace('[TencentCloudSDKError] ', '').split(',');
    const obj = {};
    body.forEach(item=>{
      const arr = item.split('=');
      obj[arr[0].trim()] = arr[1].trim();
    })

    return obj;
  },

  fetchClusters() {
    return this.queryFromTencent('clusters', {region: get(this, 'config.region')}).then((res) => {
      const clusters = get(res, 'Clusters') || [];
      const out = [];

      clusters.forEach(c=>{
        out.push({
          label: c.ClusterName,
          value: c.ClusterId
        });
      });

      set(this, 'clusterChoices', out);
      this.setDefaultSelected(out, 'config.clusterId')
    }).catch((err)=>{
      set(this, 'clusterChoices', []);
    });
  },

  fetchRegions() {
    return this.queryFromTencent('regions').then((res) => {
      const regionChoices = get(res, 'RegionInstanceSet').map((region) => {
        return {
          label: `clusterNew.tencenttke.regions.${ get(region, 'RegionName') }`,
          value: get(region, 'RegionName')
        };
      });

      set(this, 'regionChoices', regionChoices);
      this.setDefaultSelected(regionChoices, 'config.region');
    })
  },

  fetchVpcs() {
    return this.queryFromTencent('vpcs').then((res) => {
      const vpcChoices = (get(res, 'VpcSet') || []).map((vpc) => {
        return {
          label: get(vpc, 'VpcName'),
          value: get(vpc, 'VpcId')
        };
      });
      set(this, 'vpcChoices', vpcChoices);

      this.setDefaultSelected(vpcChoices, 'config.vpcId');
    })
  },

  fetchSubnets() {
    return this.queryFromTencent('subnets').then((res) => {
      set(this, 'allSubnets', (get(res, 'SubnetSet') || []).map((subnet) => {
        return {
          label: get(subnet, 'SubnetName'),
          value: get(subnet, 'SubnetId'),
          vpcId: get(subnet, 'VpcId'),
          zone:  get(subnet, 'Zone'),
        };
      }));
    })
  },

  fetchVersions() {
    return this.queryFromTencent('versions').then((res) => {
      const versionRange = ['1.23', '1.24', '1.25'];
      const versions = get(res, 'VersionInstanceSet').map((key) => {
        const enabled = versionRange.find(v=>{
          return key.Version.startsWith(`${v}.`);
        })

        return {
          label: get(key, 'Version'),
          value: get(key, 'Version'),
          rancherEnabled: !!enabled
        };
      });

      if(get(this, 'config.clusterVersion') === null){
        const version = versions.reverse().find(item=>item.rancherEnabled);

        version && set(this, 'config.clusterVersion', version.value);
      }

      set(this, 'versionChoices', versions);

      if ( !get(this, 'config.clusterVersion') && get(this, 'versionChoices.length') ) {
        set(this, 'config.clusterVersion', get(this, 'versionChoices.firstObject.value'));
      }
    });
  },

  fetchInstanceTypes() { // Another available interface “instanceTypeConfigs”
    return this.queryFromTencent('zoneInstanceConfigInfos').then((res) => {
      const allInstances = get(res, 'InstanceTypeQuotaSet');

      const out = {};

      allInstances.forEach((instance) => {
        if(instance.Status !== 'SELL' || instance.InstanceChargeType !== 'POSTPAID_BY_HOUR'){
          return;
        };

        const item = {
          value:  get(instance, 'InstanceType'),
          label:  `${ get(instance, 'TypeName') } (CPU ${ get(instance, 'Cpu') } Memory ${ get(instance, 'Memory') } GiB)`,
          group:  get(instance, 'InstanceFamily'),
          zone:   get(instance, 'Zone'),
        };

        if(!out[get(instance, 'Zone')]){
          out[get(instance, 'Zone')] = [item]
        } else {
          out[get(instance, 'Zone')].push(item);
        }
      });

      set(this, 'allInstances', out);
    });
  },

  getImages() {
    const out = [];

    OS_IMAGE.forEach(image=>{
      out.push({
        label:  get(image, 'Alias'),
        value:  get(image, 'OsName'),
      })
    });

    set(this, 'osChoices', out.sort((a, b) => a.label > b.label ? -1 : 1));

    this.setDefaultSelected(out, 'config.osName');
  },

  fetchSecurityGroups() {
    return this.queryFromTencent('securityGroups').then((res) => {
      const securityGroupChoices = (get(res, 'SecurityGroupSet') || []).map((item) => {
        return {
          label: get(item, 'SecurityGroupName'),
          value: get(item, 'SecurityGroupId')
        };
      })
      set(this, 'securityGroupChoices', securityGroupChoices);
      this.setDefaultSelected(securityGroupChoices, 'config.securityGroup');
      !this.isNew && this.setNodePoollNameDisplay(securityGroupChoices, 'securityGroup');
    });
  },

  fetchClusterLevelAttribute() {
    const intl = get(this, 'intl');

    return this.queryFromTencent('clusterLevelAttribute').then((res) => {
      const clusterLevelChoices = get(res, 'Items').map((item) => {
        const help = {
          level: get(item, 'Alias'),
          node: get(item, 'NodeCount'),
          pod: get(item, 'PodCount'),
          configMap: get(item, 'ConfigMapCount'),
          crd: get(item, 'CRDCount'),
        }

        return {
          label: intl.t('clusterNew.tencenttke.clusterLevel.help', help),
          value: get(item, 'Alias'),
        };
      })

      set(this, 'clusterLevelChoices', clusterLevelChoices);
      this.setDefaultSelected(clusterLevelChoices, 'config.clusterLevel');
    });
  },

  fetchDiskConfigQuota() {
    return this.queryFromTencent('diskConfigQuota', {
      inquiryType: 'INQUIRY_CVM_CONFIG',
    }).then((res) => {
      const diskConfigSet = get(res, 'DiskConfigSet') || [];
      const diskList = {};

      diskConfigSet.forEach(item=>{
        if(item.DiskChargeType !== 'POSTPAID_BY_HOUR'){
          return;
        }

        if(!diskList[item.InstanceFamily]){
          diskList[item.InstanceFamily] = [item];
        } else {
          diskList[item.InstanceFamily].push(item);
        }
      });

      set(this, 'diskList', diskList);
    });
  },
  fetchKeyPairs() {
    return this.queryFromTencent('keyPairs').then((res) => {
      const keyChoices = get(res, 'KeyPairSet').map((key) => {
        return {
          label: get(key, 'KeyName'),
          value: get(key, 'KeyId')
        };
      })
      set(this, 'keyChoices', keyChoices);

      this.setDefaultSelected(keyChoices, 'config.keyPair');
      !this.isNew && this.setNodePoollNameDisplay(keyChoices, 'keyPair');
    });
  },
  fetchZones() {
    const extraParams = {};

    get(this, 'intl.locale')[0] === 'zh-hans' && set(extraParams, 'language', 'zh-CN');

    return this.queryFromTencent('zones', extraParams).then((res) => {
      const zoneChoices = get(res, 'ZoneSet').filterBy('ZoneState', 'AVAILABLE').map((zone) => {
        return {
          label:      get(zone, 'ZoneName'),
          value:      get(zone, 'Zone'),
          queryId:    get(zone, 'ZoneId')
        };
      });

      set(this, 'zoneChoices', zoneChoices);
      this.setDefaultSelected(zoneChoices, 'config.zoneId');
    });
  },

  getDiskChoices(instanceType) {
    const instanceChoices = get(this, 'instanceChoices') || {};
    const selected = instanceChoices.findBy('value', instanceType);

    if(!selected){
      return;
    }

    const instanceFamily = get(selected, 'group') || '';
    const { diskList = {} } = this;
    const currentDisk = instanceFamily ? get(diskList, instanceFamily) : [];

    if(!currentDisk){
      return;
    }

    const systemDiskTypes = {};
    const dataDiskTypes = {};
    const unsupportedDiskType = {};
    const zone = get(this, 'config.zoneId');

    currentDisk.forEach(d=>{
      if(!DISKS.includes(d.DiskType)){
        unsupportedDiskType[d.DiskType] = true;
        return;
      }
      if(d.DiskUsage === DATA_DISK && d.Zone === zone && !dataDiskTypes[d.DiskType]){
        dataDiskTypes[d.DiskType] = {
          label:       `clusterNew.tencenttke.disk.${ d.DiskType }`,
          value:       d.DiskType,
          maxDiskSize: d.MaxDiskSize,
          minDiskSize: d.MinDiskSize,
        }
      } else if (d.DiskUsage === SYSTEM_DISK && d.Zone === zone  && !systemDiskTypes[d.DiskType]){
        systemDiskTypes[d.DiskType] = {
          label:       `clusterNew.tencenttke.disk.${ d.DiskType }`,
          value:       d.DiskType,
          maxDiskSize: d.MaxDiskSize,
          minDiskSize: d.MinDiskSize,
        }
      }
    });

    console.warn('Unsupported disk type:', JSON.stringify(Object.keys(unsupportedDiskType)));

    return {
      systemDiskTypes: Object.values(systemDiskTypes),
      dataDiskTypes: Object.values(dataDiskTypes),
    }
  },

  getQueryParamsString(params, deep = false) {
    const keys = Object.keys(params).sort((a, b) => {
      return a < b ? -1 : 1;
    });

    return keys.map((key) => {
      if (params[key] === undefined) {
        return '';
      }

      return `${ key }${ deep ? encodeURIComponent('=') : '=' }${ encodeURIComponent(params[key]) }`;
    }).join(deep ? encodeURIComponent('&') : '&');
  },

  getDefaultSelected(choices, specifyVal){
    if(!choices || !choices.length){
      return null;
    }

    if(specifyVal){
      const selected = choices.findBy('value', specifyVal);

      if(selected){
        return specifyVal;
      }
    }

    return get(choices, 'firstObject.value')
  },

  setDefaultSelected(choices, target, specifyVal){
    if(!get(this, 'isNew')){
      return
    }

    if(!specifyVal){
      specifyVal = get(this, target);
    }
    const selectedVal = this.getDefaultSelected(choices, specifyVal);

    set(this, target, selectedVal);

    return selectedVal;
  },

  setNodePoollNameDisplay(choices, key){
    const nodePoolList = get(this, 'nodePoolList') || [];

    nodePoolList.forEach(node=>{
      node[`display${key.charAt(0).toUpperCase()}${key.slice(1)}`] = this.configNameDisplay(node[key], choices)
    })
  },

  formatConfig(){
    const config = get(this, 'config');
    const nodePoolList = [];

    get(this, 'nodePoolList').forEach(node=>{
      const dataDisks = [{
        diskSize: node.dataDiskSize,
        diskType: node.dataDiskType
      }]
      const autoScalingGroupPara = {
        autoScalingGroupName: '',
        desiredCapacity: node.instanceNum,
        maxSize: node.instanceNum,
        minSize: 0,
        vpcId: config.vpcId,
        subnetIds: [node.subnetId],
      };
      const launchConfigurePara = {
        launchConfigurationName: '',
        instanceType: node.instanceType,
        systemDisk: {
          diskSize: node.systemDiskSize,
          diskType: node.systemDiskType,
        },
        internetChargeType: node.bandwidthType,
        internetMaxBandwidthOut: node.bandwidth,
        publicIpAssigned: true,
        dataDisks: node.dataDiskSize ? dataDisks : [],
        keyIds: [node.keyPair],
        securityGroupIds: [node.securityGroup],
        instanceChargeType: 'POSTPAID_BY_HOUR', // todo POSTPAID_BY_HOUR | SPOTPAID | PREPAID
      };

      const out = {
        clusterId: node.clusterId,
        nodePoolId: node.nodePoolId,
        autoScalingGroupPara,
        launchConfigurePara,
        enableAutoscale: true,
        name: node.nodePoolName,
        labels: [],
        taints: [],
        nodePoolOs: node.osName,
        osCustomizeType: 'GENERAL',
        tags: [],
        deletionProtection: false,
      };

      nodePoolList.push(out);
    });

    const clusterEndpoint = {
      enable: config.clusterEndpoint,
      subnetId: config.subnetId,
      securityGroup: config.securityGroup,
    }
    const clusterBasicSettings = {
      clusterDescription: '',
      clusterName: this.cluster.name,
      clusterOs: config.osName,
      clusterType: config.clusterType,
      clusterVersion: config.clusterVersion,
      vpcId: config.vpcId,
      clusterLevel: config.clusterLevel,
      isAutoUpgrade: true,
    };
    const clusterCIDRSettings = {
      clusterCIDR: config.clusterCidr,
      ignoreClusterCIDRConflict: true,
      maxClusterServiceNum: 1024,
      maxNodePodNum: 64,
      needWorkSecurityGroup: true,
      osCustomizeType: 'GENERAL',
    };

    const subnetChoices = get(this, 'subnetChoices') || {};
    const selectedSubnet = subnetChoices.findBy('value', config.subnetId) || {}
    const zone = get(selectedSubnet, 'zone') || '';
    let dataDisks = [{
      diskSize: config.dataDiskSize,
      diskType: config.dataDiskType,
    }];

    let runInstancesForNode = {
      nodeRole: "MASTER_ETCD",
      instanceChargeType: "POSTPAID_BY_HOUR",
      zone,
      instanceCount: config.ecsCount,
      "projectId": 0,
      instanceType: config.instanceType,
      imageId: config.osName,
      systemDisk: {
        diskSize: config.systemDiskSize,
        diskType: config.systemDiskType,
      },
      dataDisks: config.dataDiskSize ? dataDisks : [],
      vpcId: config.vpcId,
      subnetId: config.subnetId,
      internetChargeType: config.bandwidthType,
      internetMaxBandwidthOut: config.bandwidth,
      publicIpAssigned: true,
      instanceName: '',
      keyIds: [config.keyPair],
      securityService: false,
      monitorService: false,
      userData: ''
    }

    const clusterAdvancedSettings= {
      containerRuntime: config.container,
      ipvs: config.ipvs,
    };

    if(get(this, 'config.clusterType') !== 'INDEPENDENT_CLUSTER'){
      runInstancesForNode = undefined;
    }

    const extensionAddon = JSON.parse(config.component || [])

    return {
      tkeCredentialSecret: get(this, 'primaryResource.cloudCredentialId'),
      region: config.region,
      imported: false,
      nodePoolList,
      clusterEndpoint,
      clusterBasicSettings,
      clusterCIDRSettings,
      runInstancesForNode,
      clusterAdvancedSettings,
      extensionAddon,
    }
  },
  toValidateRequired(data, items, errors){
    const intl = get(this, 'intl');

    items.forEach(item=>{
      if(typeof(item) === 'string'){
        if(!get(data, item)){
          const label = item.endsWith('Id') ? item.substring(0, item.length-2) : item;

          errors.push(intl.t(`clusterNew.tencenttke.${ label }.required`));
        }
      }
    });

    return errors;
  },

  // Any computed properties or custom logic can go here
});
