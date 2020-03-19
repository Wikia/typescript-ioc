export const METADATA_KEY = {
  /**
   * used to access design time types
   */
  DESIGN_PARAM_TYPES: 'design:paramtypes',

  /**
   * used to store types to be injected
   */
  PARAM_TYPES: 'wikia-ioc:paramtypes',

  /**
   * used to store identifiers applies with @Inject decorator
   */
  TAGGED_TYPES: 'wikia-ioc:taggedtypes',

  /**
   * used to indicate if given class should be bound automatically
   */
  AUTOBIND: 'wikia-ioc:autobind',

  /**
   * used to indicate scope of given class
   */
  SCOPE: 'wikia-ioc:scope',
};
