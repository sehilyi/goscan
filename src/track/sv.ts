import {
    FilterTransform,
    OverlaidTracks,
    StrReplaceTransform,
    SvTypeTransform
} from 'gosling.js/dist/src/core/gosling.schema';
import { consistentSv } from '../constants';
import defaults from '../default-encoding';
import { TrackMode } from '.';

const svInfer = [
    {
        type: 'svType',
        firstBp: {
            chrField: 'chrom1',
            posField: 'start1',
            strandField: 'strand1'
        },
        secondBp: {
            chrField: 'chrom2',
            posField: 'start2',
            strandField: 'strand2'
        },
        newField: 'svclass'
    }
] as [SvTypeTransform];

const filterTranslocation: (boolean) => FilterTransform = (not: boolean) => {
    return {
        type: 'filter',
        field: 'svclass',
        oneOf: ['Translocation'],
        not
    };
};

const replace = {
    type: 'replace',
    field: 'svclass',
    replace: [
        ...Object.entries(consistentSv).map(([from, to]) => {
            return { from, to };
        })
    ],
    newField: 'svclass'
} as StrReplaceTransform;

export default function sv(
    sampleId: string,
    url: string,
    width: number,
    height: number,
    mode: TrackMode,
    selectedSvId: string
): OverlaidTracks {
    return {
        id: `${sampleId}-${mode}-sv`,
        alignment: 'overlay',
        experimental: {
            mouseEvents: {
                click: true,
                mouseOver: true,
                groupMarksByField: 'sv_id'
            }
        },
        data: {
            url,
            type: 'csv',
            separator: '\t',
            headerNames: [
                'chrom1',
                'start1',
                'end1',
                'chrom2',
                'start2',
                'end2',
                'sv_id',
                'pe_support',
                'strand1',
                'strand2'
            ],
            genomicFieldsToConvert: [
                {
                    chromosomeField: 'chrom1',
                    genomicFields: ['start1', 'end1']
                },
                {
                    chromosomeField: 'chrom2',
                    genomicFields: ['start2', 'end2']
                }
            ]
        },
        mark: 'withinLink',
        tracks: [
            {
                dataTransform: [
                    ...svInfer,
                    replace,
                    {
                        type: 'filter',
                        field: 'sv_id',
                        oneOf: [selectedSvId],
                        not: true
                    },
                    filterTranslocation(false)
                ],
                x: { field: 'start1', type: 'genomic' },
                xe: { field: 'end2', type: 'genomic' },
                stroke: { value: defaults.color.svclass.Translocation },
                baselineY: height / 2.0
            },
            ...((mode !== 'mid'
                ? []
                : [
                      {
                          mark: 'bar',
                          dataTransform: [...svInfer, replace, filterTranslocation(false)],
                          x: { field: 'start1', type: 'genomic' },
                          color: { value: defaults.color.svclass.Translocation },
                          stroke: { value: defaults.color.svclass.Translocation },
                          strokeWidth: { value: 0 },
                          size: { value: 2 },
                          style: { mouseOver: { color: 'black', strokeWidth: 0 } },
                          flipY: false
                      },
                      {
                          mark: 'bar',
                          dataTransform: [...svInfer, replace, filterTranslocation(false)],
                          x: { field: 'end2', type: 'genomic' },
                          color: { value: defaults.color.svclass.Translocation },
                          stroke: { value: defaults.color.svclass.Translocation },
                          strokeWidth: { value: 0 },
                          size: { value: 2 },
                          style: { mouseOver: { color: 'black', strokeWidth: 0 } },
                          flipY: false
                      },
                      {
                          mark: 'bar',
                          dataTransform: [
                              ...svInfer,
                              replace,
                              {
                                  type: 'filter',
                                  field: 'sv_id',
                                  oneOf: [selectedSvId]
                              },
                              filterTranslocation(false)
                          ],
                          x: { field: 'start1', type: 'genomic' },
                          color: { value: 'grey' },
                          stroke: { value: 'grey' },
                          size: { value: 3 },
                          flipY: false
                      },
                      {
                          mark: 'bar',
                          dataTransform: [
                              ...svInfer,
                              replace,
                              {
                                  type: 'filter',
                                  field: 'sv_id',
                                  oneOf: [selectedSvId]
                              },
                              filterTranslocation(false)
                          ],
                          x: { field: 'end2', type: 'genomic' },
                          color: { value: 'grey' },
                          stroke: { value: 'grey' },
                          size: { value: 3 },
                          flipY: false
                      }
                  ]) as OverlaidTracks[]),
            {
                dataTransform: [
                    ...svInfer,
                    replace,
                    {
                        type: 'filter',
                        field: 'sv_id',
                        oneOf: [selectedSvId],
                        not: true
                    },
                    filterTranslocation(true)
                ],
                x: { field: 'start1', type: 'genomic' },
                xe: { field: 'end2', type: 'genomic' }
            },
            {
                dataTransform: [
                    ...svInfer,
                    replace,
                    { type: 'filter', field: 'sv_id', oneOf: [selectedSvId] },
                    filterTranslocation(false)
                ],
                x: { field: 'start1', type: 'genomic' },
                xe: { field: 'end2', type: 'genomic' },
                stroke: { value: 'grey' }, // defaults.color.svclass.Translocation
                strokeWidth: { value: 3 },
                opacity: { value: 1 },
                baselineY: height / 2.0
            },
            {
                dataTransform: [
                    ...svInfer,
                    replace,
                    { type: 'filter', field: 'sv_id', oneOf: [selectedSvId] },
                    filterTranslocation(true)
                ],
                x: { field: 'start1', type: 'genomic' },
                xe: { field: 'end2', type: 'genomic' },
                strokeWidth: { value: 3 },
                opacity: { value: 1 }
            },
            ...((mode !== 'mid'
                ? []
                : [
                      {
                          dataTransform: [
                              ...svInfer,
                              replace,
                              { type: 'filter', field: 'sv_id', oneOf: [selectedSvId] }
                          ],
                          mark: 'rule',
                          x: { field: 'start1', type: 'genomic' },
                          color: { value: 'black' },
                          strokeWidth: { value: 1 },
                          opacity: { value: 1 },
                          style: { dashed: [3, 3] }
                      },
                      {
                          dataTransform: [
                              ...svInfer,
                              replace,
                              { type: 'filter', field: 'sv_id', oneOf: [selectedSvId] }
                          ],
                          mark: 'rule',
                          x: { field: 'end2', type: 'genomic' },
                          color: { value: 'black' },
                          strokeWidth: { value: 1 },
                          opacity: { value: 1 },
                          style: { dashed: [3, 3] }
                      }
                  ]) as OverlaidTracks[])
        ],
        y: { value: height / 2.0 },
        color: {
            field: 'svclass',
            type: 'nominal',
            legend: mode !== 'small',
            domain: defaults.color.svclass.domain,
            range: defaults.color.svclass.range
        },
        stroke: {
            field: 'svclass',
            type: 'nominal',
            domain: defaults.color.svclass.domain,
            range: defaults.color.svclass.range
        },
        strokeWidth: { value: mode === 'small' ? 1 : mode === 'mid' ? 2 : 1 },
        opacity: { value: 0.4 },
        tooltip: [
            { field: 'start1', type: 'genomic' },
            { field: 'end2', type: 'genomic' },
            { field: 'strand1', type: 'nominal' },
            { field: 'strand2', type: 'nominal' },
            { field: 'svclass', type: 'nominal' },
            { field: 'sv_id', type: 'nominal' },
            // { field: 'svmethod', type: 'nominal' },
            { field: 'pe_support', type: 'nominal' }
        ],
        style: { linkStyle: 'elliptical', linkMinHeight: 0.7, mouseOver: { stroke: 'black', strokeWidth: 2 } },
        width,
        height
    };
}