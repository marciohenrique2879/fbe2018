import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import  {FormGroup, FormControl, ControlLabel, HelpBlock, Button, Radio, Col, Panel, Row, } from 'react-bootstrap'
import axios from 'axios'
import If from './if.jsx'
import DatePicker from 'react-date-picker';



class Endereco extends Component{

    constructor(props) {
        super(props);
        this.state = {
                tipoEndereco: '',
                continentes: [],
                paises: [],
                estados: [],
                cidades: [],
                paisRadioButtonSelecionado: 'Brasil',
                paisSelecionado: '',
                estadoSelecionado: '',
                cidadeSelecionada: '',
                dataInicial: new Date(),
                inicadorDeAcuraciaInicial: '',
                dataFinal: new Date(),
                inicadorDeAcuraciaFinal: '',
                caixaPostal: '',
                cep: '',
                bairro: '',
                distrito: '',
                endereco: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.onChangeDataInicial = this.onChangeDataInicial.bind(this);
        this.onChangeDataFinal = this.onChangeDataFinal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selecionarTipoEndereco = this.selecionarTipoEndereco.bind(this);
        this.selecionarContinente = this.selecionarContinente.bind(this);
        this.selecionarPais = this.selecionarPais.bind(this);
        this.selecionarEstado = this.selecionarEstado.bind(this);
        this.selecionarCidade = this.selecionarCidade.bind(this);
        this.listarGeonames = this.listarGeonames.bind(this)
        this.listarGeonames('6295630', 'continentes');
        this.listarGeonames('3469034', 'estados');
        let selectContinenteRef;
        let radioPaisRef;
        let selectEstadoRef;
        let selectCidadeRef;
        let selectTipoEnderecoRef;
        let inputCaixaPostal;
        let inputCep;
        let inputBairro;
        let inputDistrito;
        let inputEndereco;


    }
    onChangeDataInicial(date){
        console.log(date)
        this.setState({ ...this.state, dataInicial:date })
    }
    onChangeDataFinal(date){
        console.log(date)
         this.setState({ ...this.state, dataFinal:date })
    }

    handleChange(e) {
        console.log(e.target.value,e.target.name );
       if(e.target.name === 'Pais'){ this.setState({...this.state, paisRadioButtonSelecionado: e.target.value, paises: [], estados: [], cidades: []})
        if(e.target.value === 'Brasil'){
            this.listarGeonames('3469034', 'estados')
        }
        return
        }

        this.setState({...this.state,[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        this.setState({...this.state, caixaPostal: this.inputCaixaPostal.value, cep: this.inputCep.value, bairro: this.inputBairro.value
            ,distrito: this.inputDistrito.value , endereco: this.inputEndereco.value})
        e.preventDefault();

    }

listarGeonames(geoname, indicador){
        let url = `http://www.geonames.org/childrenJSON?geonameId=${geoname}`
        axios.get(url).then(response =>{
             this.setState({[indicador]: response.data.geonames})
        })
}

    selecionarTipoEndereco(){
        this.setState({...this.state, tipoEndereco: this.selectTipoEnderecoRef.value})
    }

    selecionarContinente(){
        this.listarGeonames(this.selectContinenteRef.value,'paises')
        this.setState({...this.state, paises: [], estados: [], cidades: []})
    }

    selecionarPais(){
        let pais = this.state.paises.find(v=> v.geonameId === +this.selectPaisRef.value)
        this.setState({...this.state, paisSelecionado: pais.countryName, estados: [], cidades: []})
        this.listarGeonames(this.selectPaisRef.value,'estados')
    }

    selecionarEstado(){
        let estado = this.state.estados.find(v=> v.geonameId === +this.selectEstadoRef.value)
        this.setState({...this.state, estadoSelecionado: estado.toponymName})
        this.listarGeonames(this.selectEstadoRef.value, 'cidades')
    }

    selecionarCidade(){
        let cidade = this.state.cidades.find(v=> v.geonameId === +this.selectCidadeRef.value)
        this.setState({...this.state, cidadeSelecionada: cidade.toponymName})
    }

render(){
    let tipoEndereco = tipoEnderecoValues.map(tipo => {
        return <option key={tipo} value={tipo} >{tipo}</option>
    });

    let continentes = this.state.continentes.map(continente => {
        return <option key={continente.geonameId} value={continente.geonameId} >{continente.toponymName}</option>
    });
    let paises = this.state.paises.map(pais => {
        return <option key={pais.geonameId} value={pais.geonameId} >{pais.name}</option>
    });

    let estados = this.state.estados.map(estado => {
        return <option key={estado.geonameId} value={estado.geonameId} >{estado.toponymName}</option>
    });

    let cidades = this.state.cidades.map(cidade => {
        return <option key={cidade.geonameId} value={cidade.geonameId} >{cidade.toponymName}</option>
    });


    return(
        <div>
            <form>

                <Col xs={6} md={3}>
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel className={'negrito'}>Tipo de Endereco</ControlLabel>
                    <FormControl componentClass="select" inputRef={ref => { this.selectTipoEnderecoRef = ref; }} onChange={this.selecionarTipoEndereco} placeholder="select">
                        <option value="select">Selecione</option>
                                 {tipoEndereco}
                    </FormControl>
                </FormGroup>
                </Col>
                    <Row/>

                    <Col xs={6} md={3}>
                <ControlLabel className={'negrito'}> Data Inicial </ControlLabel>
                        <Row/>
                        <DatePicker
                            onChange={this.onChangeDataInicial}
                            value={this.state.dataInicial}
                        />
                        <Row/>
                <ControlLabel className={'negrito'}> Inicador de acurácia </ControlLabel>

                <FormGroup>
                     Dia: {' '}
                    <label> Acurado <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'AcuradoDia'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'AcuradoDia'} /></label>{' '}
                    <label> Estimado <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'EstimadoDia'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'EstimadoDia'} /></label>{' '}
                    <label> Desconhecido <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'DesconhecidoDia'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'DesconhecidoDia'} /></label>{' '}
                </FormGroup>

                <FormGroup>
                    Mes: {' '}
                    <label> Acurado <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'AcuradoMes'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'AcuradoMes'} /></label>{' '}
                    <label> Estimado <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'EstimadoMes'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'EstimadoMes'} /></label>{' '}
                    <label> Desconhecido <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'DesconhecidoMes'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'DesconhecidoMes'} /></label>{' '}
                </FormGroup>

                <FormGroup>
                     Ano: {' '}
                    <label> Acurado <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'AcuradoAno'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'AcuradoAno'} /></label>{' '}
                    <label> Estimado <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'EstimadoAno'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'EstimadoAno'} /></label>{' '}
                    <label> Desconhecido <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'DesconhecidoAno'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'DesconhecidoAno'} /></label>{' '}
                </FormGroup>
                    </Col>
                    <Row/>
                    <Col xs={6} md={3}>

                        <ControlLabel className={'negrito'}> Data Final </ControlLabel>
                        <Row/>
                        <DatePicker
                            onChange={this.onChangeDataFinal}
                            value={this.state.dataFinal}
                        />
                        <Row/>
                <ControlLabel className={'negrito'}> Inicador de acurácia </ControlLabel>
                <FormGroup>
                     Dia: {' '}
                    <label> Acurado <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'AcuradoDia'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'AcuradoDia'} /></label>{' '}
                    <label> Estimado <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'EstimadoDia'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'EstimadoDia'} /></label>{' '}
                    <label> Desconhecido <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'DesconhecidoDia'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'DesconhecidoDia'} /></label>{' '}
                </FormGroup>

                <FormGroup>
                     Mes: {' '}
                    <label> Acurado <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'AcuradoMes'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'AcuradoMes'} /></label>{' '}
                    <label> Estimado <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'EstimadoMes'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'EstimadoMes'} /></label>{' '}
                    <label> Desconhecido <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'DesconhecidoMes'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'DesconhecidoMes'} /></label>{' '}
                </FormGroup>

                <FormGroup>
                     Ano: {' '}
                    <label> Acurado <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'AcuradoAno'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'AcuradoAno'} /></label>{' '}
                    <label> Estimado <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'EstimadoAno'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'EstimadoAno'} /></label>{' '}
                    <label> Desconhecido <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'DesconhecidoAno'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'DesconhecidoAno'} /></label>{' '}

                </FormGroup>
                    </Col>
                    <Row/>
                <Col xs={6} md={3}>
                <ControlLabel className={'negrito'}> Paìs </ControlLabel> <br/>

                <label> Brasil <input type={'radio'} name={'Pais'} value={'Brasil'}  onChange={this.handleChange} checked={this.state.paisRadioButtonSelecionado === 'Brasil'} /> </label>{'  '}
                <label> Outro   <input type={'radio'} name={'Pais'} value={'Outro'}  onChange={this.handleChange} checked={this.state.paisRadioButtonSelecionado === 'Outro'} />  </label>
                </Col>
                <Row/>
                    <Col xs={6} md={3}>
                    <If test={this.state.paisRadioButtonSelecionado !== 'Brasil'} >
                    <FormGroup >
                        <ControlLabel className={'negrito'}>Continente</ControlLabel>
                        <FormControl inputRef={ref => { this.selectContinenteRef = ref; }} onChange={this.selecionarContinente} componentClass="select" placeholder="selecione">
                            <option value="select">Selecione</option>
                            {continentes}
                        </FormControl>
                    </FormGroup>

                    <FormGroup >
                        <ControlLabel className={'negrito'}>Pais</ControlLabel>
                        <FormControl inputRef={ref => { this.selectPaisRef = ref; }} onChange={this.selecionarPais} componentClass="select" placeholder="selecione">
                            <option value="select">Selecione</option>
                            {paises}
                        </FormControl>
                    </FormGroup>
                </If>

                <FormGroup >
                    <ControlLabel className={'negrito'}>Estado</ControlLabel>
                    <FormControl inputRef={ref => { this.selectEstadoRef = ref; }} onChange={this.selecionarEstado} componentClass="select" placeholder="selecione">
                        <option value="select">Selecione</option>
                        {estados}
                    </FormControl>
                </FormGroup>

                <FormGroup >
                    <ControlLabel className={'negrito'}>Cidade</ControlLabel>
                    <FormControl inputRef={ref => { this.selectCidadeRef = ref; }} onChange={this.selecionarCidade} componentClass="select" placeholder="selecione">
                        <option value="select">Selecione</option>
                        {cidades}
                    </FormControl>
                </FormGroup>
                    </Col>

                <Row/>
                <Col xs={6} md={3}>
                <FieldGroup
                        id="formControlsText"
                        type="number"
                        label="Caixa Postal"
                        inputRef={ref => this.inputCaixaPostal = ref}
                />
                </Col>
                    <Col xs={6} md={3}>
                <FieldGroup
                    id="formControlsText"
                    type="number"
                    label="Cep"
                    inputRef={ref => this.inputCep = ref}
                />
                    </Col>
                <Col xs={6} md={4}>
                <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="Bairro"
                    inputRef={ref => this.inputBairro = ref}
                />
                </Col>
                    <Col xs={6} md={5}>
                <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="Distrito"
                    inputRef={ref => this.inputDistrito = ref}
                />
                    </Col>
                    <Col xs={6} md={5}>
                <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="Endereco"
                    inputRef={ref => this.inputEndereco = ref}
                />
                    </Col>

                <Row/>

            </form>
        </div>
    )
}
}
export default Endereco




function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export const tipoEnderecoValues = ['Comercial','Correio ou Postal','Acomodacão Temporaria','Residencial','Sem Endereco Fixo','Desconhecido/Nao Declarado']