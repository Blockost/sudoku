import {
  ComponentFactoryResolver,
  Injectable,
  Type,
  ViewContainerRef,
  ViewRef
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {
  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  /**
   * Add a component to the given container.
   *
   * @param componentClass the class of the component to be added
   * @param viewContainerRef the container which the component will be added into
   */
  addComponent<T>(componentClass: Type<T>, viewContainerRef: ViewContainerRef) {
    const componentFactory = this.factoryResolver.resolveComponentFactory(
      componentClass
    );
    const component = componentFactory.create(viewContainerRef.injector);
    viewContainerRef.insert(component.hostView);
  }

  removeComponent(viewRef: ViewRef) {
    // TODO: 2018-10-05 Blockost
    // Implement removing a given component from a given container
  }
}
