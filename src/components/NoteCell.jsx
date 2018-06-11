import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const NoteCell = ({
        modClassName,
        noteClassName,
        keySignatureClassName,
        speed
    }) => {
    return <Wrapper speed={speed} className={modClassName}>
        <div className={`p-text-${noteClassName}`}></div>
        {(() => {
            if (keySignatureClassName) {
                return <div className={`p-text-${keySignatureClassName} is-layout-${noteClassName}`}></div>
            }
        })()}
    </Wrapper>
}

export default NoteCell;

const scale = keyframes`
    0% {
        transform: scale(1)
    }
    70% {
        transform: scale(1)
    }
    90% {
        transform: scale(1.3)
    }
    100% {
        transform: scale(1)
    }
`

const Wrapper = styled.div`
    position: relative;
    transform-origin: bottom;
    animation: ${scale} ${props => props.speed}ms cubic-bezier(.48,.1,.31,.99) infinite;
    &.is-next-note {
        margin-right: 20px;
        &:only-of-type {
            margin-right: 0;
        }
    }
    .p-text-flat {
        position: absolute;
        &.is-layout-c,
        &.is-layout-e,
        &.is-layout-b {
            right: -73px;
        }
        &.is-layout-d {
            right: -58px;
        }
        &.is-layout-f {
            right: -80px;
        }
        &.is-layout-g {
            right: -60px;
        }
        &.is-layout-a {
            right: 0;
        }
        top: -115px;
    }
    .p-text-sharp {
        position: absolute;

        &.is-layout-b,
        &.is-layout-c {
            right: -85px;
        }
        &.is-layout-d {
            right: -76px;
        }
        &.is-layout-e {
            right: -108px;
        }
        &.is-layout-f {
            right: -116px;
        }
        &.is-layout-g {
            right: -80px;
        }
        &.is-layout-a {
            right: -30px;
        }
        top: -105px;
    }
`

