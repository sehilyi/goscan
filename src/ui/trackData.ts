import ideogram_interpretation_1 from '../script/img/popover-images/ideogram/interpretation_1.png';
import ideogram_interpretation_2 from '../script/img/popover-images/ideogram/interpretation_2.png';
import driver_interpretation_1 from '../script/img/popover-images/driver/interpretation_1.png';
import driver_interpretation_2 from '../script/img/popover-images/driver/interpretation_2.png';
import driver_interactions_1 from '../script/img/popover-images/driver/interactions_1.png';
import genes_interpretation_1 from '../script/img/popover-images/genes/interpretation_1.png';
import genes_interpretation_2 from '../script/img/popover-images/genes/interpretation_2.png';
import genes_interactions_1 from '../script/img/popover-images/genes/interactions_1.png';
import genes_interactions_2 from '../script/img/popover-images/genes/interactions_2.png';
import mutations_interpretation_1 from '../script/img/popover-images/mutations/interpretation_1.png';
import mutations_interactions_1 from '../script/img/popover-images/mutations/interactions_1.png';
import mutations_interactions_2 from '../script/img/popover-images/mutations/interactions_2.png';
import insertions_interpretation_1 from '../script/img/popover-images/insertions/interpretation_1.png';
import insertions_interpretation_2 from '../script/img/popover-images/insertions/interpretation_2.png';
import deletions_interpretation_1 from '../script/img/popover-images/deletions/interpretation_1.png';
import deletions_interactions_1 from '../script/img/popover-images/deletions/interactions_1.png';
import copy_number_variants_interpretation_1 from '../script/img/popover-images/copy_number_variants/interpretation_1.png';
import copy_number_variants_interpretation_2 from '../script/img/popover-images/copy_number_variants/interpretation_2.png';
import copy_number_variants_interactions_1 from '../script/img/popover-images/copy_number_variants/interactions_1.png';
import gains_interpretation_1 from '../script/img/popover-images/gains/interpretation_1.png';
import gains_interpretation_2 from '../script/img/popover-images/gains/interpretation_2.png';
import loh_interpretation_1 from '../script/img/popover-images/loh/interpretation_1.png';
import loh_interpretation_2 from '../script/img/popover-images/loh/interpretation_2.png';
import structural_variants_interpretation_1 from '../script/img/popover-images/structural_variants/interpretation_1.png';
import structural_variants_interactions_1 from '../script/img/popover-images/structural_variants/interactions_1.png';
import structural_variants_interactions_2 from '../script/img/popover-images/structural_variants/interactions_2.png';

export type Track =
    | 'ideogram'
    | 'gene'
    | 'mutation'
    | 'cnv'
    | 'sv'
    | 'indel'
    | 'driver'
    | 'gain'
    | 'loh'
    | 'coverage'
    | 'sequence'
    | 'alignment';

// TODO: Not ideal to hard coded!
// The heights of each track
export const getTrackData = (
    isMinimalMode: boolean
): { height: number; type: Track; title: string; popover_content?: string }[] => {
    return [
        {
            height: 50,
            type: 'ideogram',
            title: 'Ideogram',
            popover_content: `
                <div class='popover-content'>
                    <div class='section interpretation'>
                        <h3>Interpretation</h3>
                        <hr />
                        <div class="block with-image">
                            <img src="${ideogram_interpretation_1}" alt="" />
                            <div class="text">
                                <p><b>Black stripes</b> - indicate chromosome bands (cytobands) obtained from chromosome staining viewing under microscope.</p>
                            </div>
                        </div>
                        <hr />
                        <div class="block with-image">
                            <img src="${ideogram_interpretation_2}" alt="" />
                            <div class="text">
                                <p><span class="text-red"><b>Red Triangles</b></span> - represent chromosome centromeres.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            height: 40,
            type: 'driver',
            title: 'Putative Driver',
            popover_content: `
                <div class='popover-content'>
                    <div class='section interpretation'>
                        <h3>Interpretation</h3>
                        <hr class="header" />
                        <div class="section-content">
                            <div class="block with-image">
                                <img src="${driver_interpretation_1}" alt="" />
                                <div class="text">
                                    <p><b>Circle with a dot</b> - denotes bi-allelic gene loss.</p>
                                    <p><b>Circle without a dot</b> - denotes one mutation in gene.</p>
                                </div>
                            </div>
                            <hr />
                            <div class="block with-image">
                            <img src="${driver_interpretation_2}" alt="" />
                                <div class="text">
                                    <p>Driver mutations are also annotated by name in the genome view.</p>
                                </div>
                            </div>
                            <hr />
                            <div class='block text-only'>
                                <p>Driver mutations need to be curated and pre-specified as part of Chromoscope configuration <a href="https://chromoscope.bio/loading-data/through-data-config" target="_blank" rel="noreferrer">data specification</a>.</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class='section interactions'>
                        <h3>Interactions</h3>
                        <hr class="header" />
                        <div class="block with-image">
                            <img src="${driver_interactions_1}" alt="" />
                            <div class="text">
                                <p><b>Click</b> - on driver variant to see the annotation details.</p>
                            </div>
                        </div>
                    </div>
                </div>`
        },
        {
            height: 60,
            type: 'gene',
            title: 'Gene Annotation',
            popover_content: `
                <div class='popover-content'>
                    <div class='section interpretation'>
                        <h3>Interpretation</h3>
                        <hr class="header" />
                        <div class="block with-image">
                            <img src="${genes_interpretation_1}" alt="" />
                            <div class="text">
                                <p><b>Arrows</b> - represent genes.</p>
                                <p><b>Direction</b> - denotes gene strand.</p>
                            </div>
                        </div>
                        <hr />
                        <div class="block with-image">
                            <img src="${genes_interpretation_2}" alt="" />
                            <div class="text">
                                <p><b>Thicker lines</b> - represent Exons.</p>
                            </div>
                        </div>
                    </div>
                    <div class='section interactions'>
                        <h3>Interactions</h3>
                        <hr class="header"/>
                        <div class="block with-image">
                            <img src="${genes_interactions_1}" alt="" />
                            <div class="text">
                                <p><b>Zoom out</b> - only selected genes are shown <a href="https://chromoscope.bio/visualizations/data-sampling/" target="_blank" rel="noreferrer">sampling info</a>.</p>
                            </div>
                        </div>
                        <hr />
                        <div class="block with-image">
                            <img src="${genes_interactions_2}" alt="" />
                            <div class="text">
                                <p><b>Zoom in</b> - to a smaller region to see all genes in that region.</p>
                            </div>
                        </div>
                    </div>
                </div>`
        },
        {
            height: 60,
            type: 'mutation',
            title: 'Point Mutation',
            popover_content: `
            <div class='popover-content'>
                <div class='section interpretation'>
                    <h3>Interpretation</h3>
                    <hr class="header"/>
                    <div class="block with-image column">
                        <img src="${mutations_interpretation_1}" alt="" />
                        <div class="text">
                            <p><b>Y-axis</b> shows the distance (in kb) between adjacent point mutations, on a logarithmic scale.</p>
                            <hr class="my-3" />
                            <p>At this magnification, they <a href="https://chromoscope.bio/visualizations/data-sampling/" target="_blank" rel="noreferrer">might have been sampled</a>.</p>
                        </div>
                    </div>
                </div>
                <div class='section interactions'>
                    <h3>Interactions</h3>
                    <hr class="header" />
                    <div class="block with-image">
                        <img src="${mutations_interactions_1}" alt="" />
                        <div class="text">
                            <p>
                                <b>Zoom in</b> - to reveal more point mutations.
                            </p>
                        </div>
                    </div>
                    <hr/>
                    <div class="block with-image">
                        <img src="${mutations_interactions_2}" alt="" />
                        <div class="text">
                            <p><b>Hover</b> - over a point mutation to see details.</p>
                        </div>
                    </div>
                </div>
            </div>`
        },
        {
            height: 40,
            type: 'indel',
            title: 'Indel',
            popover_content: `
            <div class='popover-content'>
                <div class='section interpretation'>
                    <h3>Interpretation</h3>
                    <hr class="header" />
                    <div class="section-content">
                        <div class="block with-image">
                            <div class="image-container two-image">
                                <img src="${insertions_interpretation_1}" alt="" />
                                <img src="${deletions_interpretation_1}" alt="" />
                            </div>
                            <div class="text">
                                <p><span class="orange"><b>Orange lines</b></span> - mark insertions.</p>
                                <p><span class="green"><b>Green lines</b></span> - mark deletions.</p>
                            </div>
                        </div>
                        <hr />
                        <div class="block with-image">
                            <div class="image-container">
                                <img src="${insertions_interpretation_2}" alt="" />
                            </div>
                            <div class="text">
                                <p>When showing large chromosomal regions, Chromoscope selects 500 indels in each visible tile (<a href="https://chromoscope.bio/visualizations/data-sampling/#vcf--tbi" target="_blank" rel="noreferrer">see documentation on sampling</a>).</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='section interactions'>
                    <h3>Interactions</h3>
                    <hr class="header" />
                    <div class="block with-image">
                        <img src="${deletions_interactions_1}" alt="" />
                        <div class="text">
                            <p><b>Hover</b> - on a deletion to see the deleted sequence.</p>
                            <p>Deletions are identified where an alternative allele is longer than reference.</p>
                        </div>
                    </div>
                </div>
            </div>`
        },
        {
            height: 60,
            type: 'cnv',
            title: 'Copy Number Variants',
            popover_content: `
                <div class='popover-content'>
                    <div class='section interpretation'>
                        <h3>Interpretation</h3>
                        <hr class="header" />
                        <div class="block with-image">
                            <img src="${copy_number_variants_interpretation_1}" alt="" />
                            <div class="text">
                                <p><span class="text-gray"><b></span>Thick gray lines</b> - represent copy number profiles.</p>
                                <p><b>Y-axis</b> - represents the number of chromosome copies.</p>
                            </div>
                        </div>
                        <hr />
                        <div class="block with-image">
                            <img src="${copy_number_variants_interpretation_2}" alt="" />
                            <div class="text">
                                <p>Copy number variants often coincide with structural variants.</p>
                                <p>Structural variants often demarcate copy number changes.</p>
                            </div>
                        </div>
                    </div>
                    <div class='section interactions'>
                        <h3>Interactions</h3>
                        <hr class="header" />
                        <div class="block with-image">
                            <img src="${copy_number_variants_interactions_1}" alt="" />
                            <div class="text">
                                <p>
                                    <b>Hover</b> - over the copy number segment to see the number of copies of each chromosomal regions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            height: 20,
            type: 'gain',
            title: 'Gain',
            popover_content: `
            <div class='popover-content'>
                <div class='section interpretation'>
                    <h3>Interpretation</h3>
                    <hr class="header" />
                    <div class="block with-image">
                        <img src="${gains_interpretation_1}" alt="" />
                        <div class="text">
                            <p>Gains are declared in chromosomal regions where total number of copies exceeds 5.</p>
                        </div>
                    </div>
                    <hr />
                    <div class="block with-image">
                        <img src="${gains_interpretation_2}" alt="" />
                        <div class="text">
                            <p>Regions with gains are marked in <span class="text-blue"><b>blue</b></span> on both Genome and Variant Views.</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        },
        {
            height: 20,
            type: 'loh',
            title: 'Loss of Heterozygosity',
            popover_content: `
            <div class='popover-content'>
                <div class='section interpretation'>
                <h3>Interpretation</h3>
                <hr class="header" />
                    <div class='block text-only'>
                        <p>LOH is declared in regions where a chromosome copy from one of the parents was entirely lost (minor copy number of 0).</p>
                    </div>
                    <div class="block with-image">
                        <img src="${loh_interpretation_1}" alt="" />
                        <div class="text">
                            <p>Regions with LOH are marked in <span class="text-coral"><b>coral</b></span> in Variant View.</p>
                        </div>
                    </div>
                    <hr />
                    <div class="block with-image">
                        <img src="${loh_interpretation_2}" alt="" />
                        <div class="text">
                            <p>Regions with LOH are marked in <span class="text-coral"><b>coral</b></span> in Genome View.</p>
                        </div>
                    </div>
                </div>
            </div>`
        },
        {
            height: 250 + (isMinimalMode ? 100 : 40) + 30,
            type: 'sv',
            title: 'Structural Variants',
            popover_content: `
             <div class='popover-content'>
                 <div class='section interpretation'>
                     <h3>Interpretation</h3>
                     <hr class="header"/>
                     <div class="block with-image column">
                         <img src="${structural_variants_interpretation_1}" alt="" />
                         <div class="text">
                             <p><b>Arches</b> - represent structural variants (SVs).</p>
                             <p><b>Colors</b> - denote different types of SVs.</p>
                         </div>
                     </div>
                 </div>
                 <div class='section interactions'>
                     <h3>Interactions</h3>
                     <hr class="header" />
                     <div class="block with-image">
                         <img src="${structural_variants_interactions_1}" alt="" />
                         <div class="text">
                             <p><b>Click</b> - on an SV to show its breakpoints in the read view.</p>
                         </div>
                     </div>
                     <hr/>
                     <div class="block with-image">
                         <img src="${structural_variants_interactions_2}" alt="" />
                         <div class="text">
                             <p><b>Hover</b> - over a SV to see more information about each event.</p>
                         </div>
                     </div>
                 </div>
             </div>`
        },
        {
            height: 80,
            type: 'coverage',
            title: 'Coverage'
            // popover_content:
        },
        {
            height: 40,
            type: 'sequence',
            title: 'Sequence'
            // popover_content:
        },
        {
            height: 500,
            type: 'alignment',
            title: 'Alignment'
            // popover_content:
        }
    ];
};
