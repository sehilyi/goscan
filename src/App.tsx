import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GoslingComponent } from 'gosling.js';
import { debounce } from 'lodash';
import generateSpec from './spec-generator';
import { CommonEventData } from 'gosling.js/dist/src/core/api';
import ErrorBoundary from './error';
import './App.css';

import drivers from './data/driver.json';
import samples from './data/samples';
import getSmallOverviewSpec from './overview-spec';

const INIT_VIS_PANEL_WIDTH = window.innerWidth;
const CONFIG_PANEL_WIDTH = 800;
const VIS_PADDING = 60;
const CHROMOSOMES = [
    'chr1',
    'chr2',
    'chr3',
    'chr4',
    'chr5',
    'chr6',
    'chr7',
    'chr8',
    'chr9',
    'chr10',
    'chr11',
    'chr12',
    'chr13',
    'chr14',
    'chr15',
    'chr16',
    'chr17',
    'chr18',
    'chr19',
    'chr20',
    'chr21',
    'chr22',
    'chrX',
    'chrY'
];
const ZOOM_PADDING = 200;
const ZOOM_DURATION = 1000;
const theme = {
    base: 'light',
    root: {
        background: 'white',
        titleAlign: 'middle',
        titleColor: 'black',
        titleFontSize: 14,
        titleFontWeight: 'normal',
        subtitleAlign: 'middle',
        subtitleColor: 'gray',
        subtitleFontSize: 10,
        subtitleFontWeight: 'normal'
    }
};

function App() {
    const gosRef = useRef<any>();

    // TODO: We could just use sampleId to get detailed info. not to update all info as states.
    // demo
    const [demoIdx, setDemoIdx] = useState(0);
    const [sampleId, setSampleId] = useState(samples[demoIdx].id);
    const [cancer, setCancer] = useState(samples[demoIdx].cancer);
    const [svUrl, setSvUrl] = useState(samples[demoIdx].sv);
    const [cnvUrl, setCnvUrl] = useState(samples[demoIdx].cnv);
    const [bamUrl, setBamUrl] = useState(samples[demoIdx].bam);
    const [baiUrl, setBaiUrl] = useState(samples[demoIdx].bai);

    // interactions
    const [showSamples, setShowSamples] = useState(false);
    const [showOverview, setShowOverview] = useState(true);
    const [showPutativeDriver, setShowPutativeDriver] = useState(true);
    const [interactiveMode, setInteractiveMode] = useState(false);
    const [visPanelWidth, setVisPanelWidth] = useState(INIT_VIS_PANEL_WIDTH - VIS_PADDING * 2);
    const [overviewChr, setOverviewChr] = useState('');
    const [genomeViewChr, setGenomeViewChr] = useState('');
    const [filteredDrivers, setFilteredDrivers] = useState(
        (drivers as any).filter((d: any) => d.sample_id === sampleId && +d.chr && +d.pos)
    );
    const [selectedSvId, setSelectedSvId] = useState<string>('');
    const [breakpoints, setBreakpoints] = useState<[number, number, number, number]>([1, 100, 1, 100]);
    const [bpIntervals, setBpIntervals] = useState<[number, number, number, number] | undefined>();
    const [mousePosition, setMousePosiiton] = useState({ left: -100, top: -100 });
    const [mouseOnVis, setMouseOnVis] = useState(false);

    // SV data
    const leftReads = useRef<{ [k: string]: number | string }[]>([]);
    const rightReads = useRef<{ [k: string]: number | string }[]>([]);
    const [svReads, setSvReads] = useState<{ name: string; type: string }[]>([]);

    // update demo
    useEffect(() => {
        setSampleId(samples[demoIdx].id);
        setCancer(samples[demoIdx].cancer);
        setSvUrl(samples[demoIdx].sv);
        setCnvUrl(samples[demoIdx].cnv);
        setBamUrl(samples[demoIdx].bam);
        setBaiUrl(samples[demoIdx].bai);
        setFilteredDrivers(
            (drivers as any).filter((d: any) => d.sample_id === samples[demoIdx].id && +d.chr && +d.pos)
        );
        leftReads.current = [];
        rightReads.current = [];
    }, [demoIdx]);

    useEffect(() => {
        if (!gosRef.current) return;

        gosRef.current.api.subscribe('click', (type: string, e: CommonEventData) => {
            const zoom = false;
            if (zoom) {
                // start and end positions are already cumulative values
                gosRef.current.api.zoomTo(
                    `${sampleId}-bottom-left-coverage`,
                    `chr1:${e.data.start1}-${e.data.end1}`,
                    ZOOM_PADDING,
                    ZOOM_DURATION
                );
                gosRef.current.api.zoomTo(
                    `${sampleId}-bottom-right-coverage`,
                    `chr1:${e.data.start2}-${e.data.end2}`,
                    ZOOM_PADDING,
                    ZOOM_DURATION
                );
            } else {
                gosRef.current.api.zoomTo(
                    `${sampleId}-mid-ideogram`,
                    `chr1:${e.data.start1}-${e.data.end2}`,
                    ZOOM_PADDING,
                    1000
                );
                // we will show the bam files, so set the initial positions
                setBreakpoints([
                    +e.data.start1 - ZOOM_PADDING,
                    +e.data.end1 + ZOOM_PADDING,
                    +e.data.start2 - ZOOM_PADDING,
                    +e.data.end2 + ZOOM_PADDING
                ]);
            }

            // Move to the bottom
            setTimeout(
                () => document.getElementById('gosling-panel')?.scrollTo({ top: 1000000, behavior: 'smooth' }),
                2000
            );

            setBpIntervals([+e.data.start1, +e.data.end1, +e.data.start2, +e.data.end2]);
            setSelectedSvId(e.data.sv_id + '');
            leftReads.current = [];
            rightReads.current = [];
        });

        gosRef.current.api.subscribe('rawdata', (type: string, e: any) => {
            if (e.id.includes('bam') && (leftReads.current.length === 0 || rightReads.current.length === 0)) {
                // This means we just received a BAM data that is just rendered
                if (e.id.includes('left') && leftReads.current.length === 0) {
                    leftReads.current = e.data;
                } else if (e.id.includes('right') && rightReads.current.length === 0) {
                    rightReads.current = e.data;
                }
                // Reads on both views prepared?
                if (leftReads.current.length !== 0 && rightReads.current.length !== 0) {
                    const mates = leftReads.current
                        .filter(l => rightReads.current.filter(r => r.name === l.name && r.id !== l.id).length !== 0)
                        .map(d => d.name as string);

                    const matesWithSv = mates.map(name => {
                        const matesOnLeft = leftReads.current.filter(d => d.name === name);
                        const matesOnRight = rightReads.current.filter(d => d.name === name);

                        if (matesOnLeft.length !== 1 || matesOnRight.length !== 1) {
                            // We do not do anything for this case for now.
                            return { name, type: 'unknown' };
                        }

                        // console.log(matesOnLeft[0], matesOnRight[0]);
                        const ld = matesOnLeft[0].strand;
                        const rd = matesOnRight[0].strand;

                        if (matesOnLeft[0].chrName !== matesOnRight[0].chrName) return { name, type: 'Translocation' };
                        if (ld === '+' && rd === '-') return { name, type: 'Deletion' };
                        if (ld === '-' && rd === '-') return { name, type: 'Inversion (TtT)' };
                        if (ld === '+' && rd === '+') return { name, type: 'Inversion (HtH)' };
                        if (ld === '-' && rd === '+') return { name, type: 'Duplication' };
                        return { name, type: 'unknown' };
                    });
                    // console.log("mates", matesWithSv)
                    if (
                        matesWithSv
                            .map(d => d.name)
                            .sort()
                            .join() !==
                        svReads
                            .map(d => d.name)
                            .sort()
                            .join()
                    ) {
                        setSvReads(matesWithSv);
                    }
                }
            }
        });

        // gosRef.current.api.subscribe('mouseover', (type: string, e: CommonEventData) => {
        // setHoveredSvId(e.data.sv_id + '');
        // });

        return () => {
            gosRef.current.api.unsubscribe('click');
            gosRef.current.api.unsubscribe('rawdata');
            // gosRef.current.api.unsubscribe('mouseover');
        };
    }, [gosRef, svReads, sampleId]);

    useEffect(() => {
        if (!overviewChr) return;

        if (overviewChr.includes('chr')) {
            gosRef.current?.api.zoomTo(`${sampleId}-top-ideogram`, overviewChr, 0, 0); // ZOOM_DURATION);
            setGenomeViewChr(overviewChr);
        } else {
            gosRef.current?.api.zoomToExtent(`${sampleId}-top-ideogram`, ZOOM_DURATION);
        }
    }, [overviewChr]);

    useEffect(() => {
        if (!genomeViewChr) return;

        if (genomeViewChr.includes('chr')) {
            gosRef.current?.api.zoomTo(`${sampleId}-mid-ideogram`, genomeViewChr, 0, ZOOM_DURATION);
        } else {
            gosRef.current?.api.zoomToExtent(`${sampleId}-mid-ideogram`, ZOOM_DURATION);
        }
    }, [genomeViewChr]);

    // Change the width of the visualization panel
    useEffect(() => {
        window.addEventListener(
            'resize',
            debounce(() => {
                setVisPanelWidth(window.innerWidth - VIS_PADDING * 2);
            }, 500)
        );
    }, []);

    const smallOverviewGoslingComponents = useMemo(() => {
        const specs = samples.map(d =>
            getSmallOverviewSpec({
                cnvUrl: d.cnv,
                svUrl: d.sv,
                width: 200,
                title: d.cancer.charAt(0).toUpperCase() + d.cancer.slice(1),
                subtitle: '' + d.id.slice(0, 20) + '...'
            })
        );
        return specs.map(spec => [
            <GoslingComponent
                key={JSON.stringify(spec)}
                ref={gosRef}
                spec={spec}
                padding={0}
                margin={0}
                theme={theme as any}
            />,
            spec
        ]);
    }, []);

    const smallOverviewWrapper = useMemo(() => {
        return smallOverviewGoslingComponents.map(([component, spec], i) => (
            <div
                key={JSON.stringify(spec)}
                onClick={() => {
                    setShowSamples(false);
                    setTimeout(() => {
                        setDemoIdx(i);
                        setSelectedSvId('');
                    }, 300);
                }}
                className={demoIdx === i ? 'selected-overview' : 'unselected-overview'}
            >
                {component}
            </div>
        ));
    }, [demoIdx]);

    const goslingComponent = useMemo(() => {
        const spec = generateSpec({
            sampleId,
            svUrl,
            cnvUrl,
            bamUrl,
            baiUrl,
            showOverview,
            xOffset: 0,
            showPutativeDriver,
            width: visPanelWidth,
            drivers: filteredDrivers,
            selectedSvId,
            breakpoints: breakpoints,
            crossChr: false,
            bpIntervals,
            svReads
        });
        // console.log('spec', spec);
        return (
            <GoslingComponent
                ref={gosRef}
                spec={spec}
                padding={0}
                margin={0}
                experimental={{ reactive: true }}
                theme={theme as any}
            />
        );
    }, [
        visPanelWidth,
        filteredDrivers,
        showOverview,
        showPutativeDriver,
        svUrl,
        cnvUrl,
        selectedSvId,
        breakpoints,
        svReads
    ]);

    return (
        <ErrorBoundary>
            <div
                style={{ width: '100%', height: '100%' }}
                onMouseMove={e => {
                    const top = e.clientY;
                    const left = e.clientX;
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    if (
                        VIS_PADDING < top &&
                        top < height - VIS_PADDING &&
                        VIS_PADDING < left &&
                        left < width - VIS_PADDING
                    ) {
                        setMouseOnVis(true);
                    } else {
                        setMouseOnVis(false);
                    }
                    setMousePosiiton({ top: e.clientY, left: e.clientX });
                }}
                onClick={() => {
                    if (!mouseOnVis && interactiveMode) setInteractiveMode(false);
                    else if (mouseOnVis && !interactiveMode) setInteractiveMode(true);
                }}
            >
                <svg
                    className="config-button"
                    viewBox="0 0 16 16"
                    onClick={() => {
                        setShowSamples(true);
                    }}
                >
                    <title>Menu</title>
                    <path
                        fillRule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                </svg>
                <div className="sample-label">
                    {cancer.charAt(0).toUpperCase() + cancer.slice(1) + ' • ' + sampleId}
                </div>
                <div className="help-label">
                    <span style={{ border: '2px solid gray', borderRadius: 10, padding: '0px 4px', margin: '6px' }}>
                        {'?'}
                    </span>
                    {'Click on a SV to see alignemt around breakpoints'}
                </div>
                <div id="vis-panel" className="vis-panel">
                    <div className={'vis-overview-panel ' + (!showSamples ? 'hide' : '')}>
                        <div className="title">
                            Samples
                            <svg
                                className="button"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                    setShowSamples(false);
                                }}
                            >
                                <title>Close</title>
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                        <div className="config">
                            <div className="config-panel-input-container">
                                <span className="config-panel-label">Circular Overview</span>
                                <span className="config-panel-input">
                                    {
                                        <select
                                            className="config-panel-dropdown"
                                            onChange={e => {
                                                setShowSamples(false);
                                                const chr = e.currentTarget.value;
                                                setTimeout(() => setOverviewChr(chr), 300);
                                            }}
                                            value={overviewChr}
                                            disabled={!showOverview}
                                        >
                                            {['All', ...CHROMOSOMES].map(chr => {
                                                return (
                                                    <option key={chr} value={chr}>
                                                        {chr}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    }
                                </span>
                            </div>
                            <div className="config-panel-input-container">
                                <span className="config-panel-label">Linear Genome View</span>
                                <span className="config-panel-input">
                                    {
                                        <select
                                            className="config-panel-dropdown"
                                            onChange={e => {
                                                setShowSamples(false);
                                                const chr = e.currentTarget.value;
                                                setTimeout(() => {
                                                    setGenomeViewChr(chr);
                                                }, 300);
                                            }}
                                            value={genomeViewChr}
                                        >
                                            {CHROMOSOMES.map(chr => {
                                                return (
                                                    <option key={chr} value={chr}>
                                                        {chr}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    }
                                </span>
                            </div>
                            <div className="config-panel-button" onClick={() => gosRef.current?.api.exportPng()}>
                                Export PNG
                            </div>
                        </div>
                        <div className="overview-container">{smallOverviewWrapper}</div>
                    </div>
                    <div
                        id="gosling-panel"
                        className="gosling-panel"
                        style={{
                            width: `calc(100% - ${VIS_PADDING * 2}px)`,
                            height: `calc(100% - ${VIS_PADDING * 2}px)`,
                            padding: VIS_PADDING
                        }}
                    >
                        {goslingComponent}
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                boxShadow: `inset 0 0 0 3px ${
                                    interactiveMode && mouseOnVis
                                        ? '#2399DB'
                                        : !interactiveMode && mouseOnVis
                                        ? 'lightgray'
                                        : !interactiveMode && !mouseOnVis
                                        ? '#00000000'
                                        : 'lightgray'
                                }`,
                                top: VIS_PADDING,
                                left: VIS_PADDING,
                                opacity: 0.9,
                                pointerEvents: interactiveMode ? 'none' : 'auto'
                            }}
                        />
                    </div>
                </div>
                <div
                    style={{
                        visibility:
                            ((!interactiveMode && mouseOnVis) || (interactiveMode && !mouseOnVis)) && !showSamples
                                ? 'visible'
                                : 'collapse',
                        position: 'absolute',
                        left: `${VIS_PADDING}px`,
                        top: '60px', // `${mousePosition.top + 20}px`,
                        background: 'lightgray',
                        color: 'black',
                        padding: '6px',
                        pointerEvents: 'none',
                        zIndex: 9999,
                        boxShadow: '0 0 20px 2px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    {!interactiveMode
                        ? 'Click inside to use interactions on visualizations'
                        : 'Click outside to deactivate interactions'}
                </div>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        visibility: 'collapse',
                        boxShadow: interactiveMode ? 'inset 0 0 4px 2px #2399DB' : 'none',
                        zIndex: 9999,
                        background: 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        pointerEvents: 'none'
                    }}
                />
            </div>
        </ErrorBoundary>
    );
}

export default App;
