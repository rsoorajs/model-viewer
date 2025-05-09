/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import swc from '@rollup/plugin-swc';

const watchFiles = ['lib/**', '../model-viewer/lib/**'];

const plugins = [
  {
    resolveId: (id) => {
      if (id === 'jszip') {
        return '../../node_modules/jszip/dist/jszip.min.js';
      }
      return null;
    },
  },
  resolve(),
  commonjs(),
  swc()
];

export default [{
  input: './lib/app.js',
  output: {file: './dist/space-opera.js', format: 'esm', name: 'Space Opera'},
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED')
      return;
    warn(warning);
  },
  plugins,
  watch: {
    include: watchFiles,
  },
}];
