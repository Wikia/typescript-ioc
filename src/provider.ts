/**
 * A factory for instances created by the Container. Called every time an instance is needed.
 */
export interface Provider {
  /**
   * Factory method, that should create the bind instance.
   * @return the instance to be used by the Container
   */
  get(): Object;
}
