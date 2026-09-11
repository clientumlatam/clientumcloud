import React from 'react';
import { UnifiedControlHub } from '../workspace/UnifiedControlHub';

/**
 * Componente EcosistemaHub consolidado en UnifiedControlHub.
 * Combina el acceso rápido del Ecosistema con la gestión del Workspace
 * en un solo centro de control visual y funcional.
 */
export { UnifiedControlHub, CANONICAL_ECOSYSTEM_MODULES } from '../workspace/UnifiedControlHub';
export type { EcosystemModuleConfig } from '../workspace/UnifiedControlHub';

export const EcosistemaHub: React.FC = () => {
  return <UnifiedControlHub />;
};

export default EcosistemaHub;
