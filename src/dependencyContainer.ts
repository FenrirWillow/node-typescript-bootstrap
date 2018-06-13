import * as path from 'path';
import * as Awilix from 'awilix';
import formatRouterModuleName from './utils/formatRouterModuleName';

class DependencyContainer {
  private static instance: Awilix.AwilixContainer;

  public static getInstance(): Awilix.AwilixContainer {
    if (typeof DependencyContainer.instance !== 'undefined') {
      return DependencyContainer.instance;
    }

    DependencyContainer.instance = Awilix.createContainer();
    DependencyContainer.instance.loadModules(
      [
        'controllers/**/*.ts',
        'controllers/**/*.js',
        'services/**/*.ts',
        'services/**/*.js',
      ],
      {
        formatName: 'camelCase',
        cwd: __dirname,
        resolverOptions: {
          lifetime: Awilix.Lifetime.SINGLETON,
          register: Awilix.asClass,
        },
      },
    );

    DependencyContainer.instance.loadModules(
      [
        'routes/**/*.ts',
        'routes/**/*.js',
      ],
      {
        formatName: formatRouterModuleName,
        cwd: __dirname,
        resolverOptions: {
          lifetime: Awilix.Lifetime.SINGLETON,
          register: Awilix.asFunction,
        },
      },
    );

    return DependencyContainer.instance;
  }
}

export default DependencyContainer;
