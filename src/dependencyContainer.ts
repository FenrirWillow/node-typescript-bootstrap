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
        'services/**/*.ts',
      ],
      {
        formatName: 'camelCase',
        cwd: path.join(process.cwd(), 'src'),
        resolverOptions: {
          lifetime: Awilix.Lifetime.SINGLETON,
          register: Awilix.asClass,
        },
      },
    );

    DependencyContainer.instance.loadModules(
      [
        'routes/**/*.js',
      ],
      {
        formatName: formatRouterModuleName,
        cwd: path.join(process.cwd(), 'src'),
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
