import { Configuration, V0alpha2Api } from '@ory/client';
import { V0alpha2Api as OpenSourceV0alpha2Api, V0alpha2ApiInterface } from '@ory/kratos-client';

import { kratosPublicBaseUrl } from '../../../common/configuration';

export const sdk = new OpenSourceV0alpha2Api(new Configuration({ basePath: kratosPublicBaseUrl }));
